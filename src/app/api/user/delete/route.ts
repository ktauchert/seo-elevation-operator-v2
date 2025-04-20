import admin from "@/config/firebaseAdminConfig";
import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Validate the requesting user is an admin
    const adminId = await validateTokenAndGetUserId(req);
    if (!adminId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if requesting user is an admin
    const adminDoc = await admin
      .firestore()
      .collection("users")
      .doc(adminId)
      .collection("user")
      .doc("data")
      .get();

    if (!adminDoc.exists || adminDoc.data()?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Get user ID to delete and deletion type
    const { user_uid, type } = await req.json();
    if (!user_uid) {
      return NextResponse.json(
        { error: "User UID is required" },
        { status: 400 }
      );
    }

    // Don't allow admins to delete themselves
    if (user_uid === adminId) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Handle pending access request deletion
    if (type === "access_request") {
      await admin.firestore().collection("accessRequests").doc(user_uid).delete();
      return NextResponse.json(
        { message: "Access request deleted successfully" },
        { status: 200 }
      );
    }

    // Start a batch operation to delete all user data
    const batch = admin.firestore().batch();

    // 1. Delete user data document
    try {
      const userDataRef = admin
        .firestore()
        .collection("users")
        .doc(user_uid)
        .collection("user")
        .doc("data");
      
      const userDataDoc = await userDataRef.get();
      if (userDataDoc.exists) {
        batch.delete(userDataRef);
      }
    } catch (error) {
      console.warn("Error preparing user data deletion:", error);
    }

    // 2. Delete user credits document
    try {
      const userCreditsRef = admin
        .firestore()
        .collection("users")
        .doc(user_uid)
        .collection("user")
        .doc("credits");
      
      const creditsDoc = await userCreditsRef.get();
      if (creditsDoc.exists) {
        batch.delete(userCreditsRef);
      }
    } catch (error) {
      console.warn("Error preparing credits deletion:", error);
    }

    // 3. Get all results documents and delete them
    try {
      const resultsRef = admin
        .firestore()
        .collection("users")
        .doc(user_uid)
        .collection("results");
      
      const resultsSnapshot = await resultsRef.get();
      resultsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
    } catch (error) {
      console.warn("Error preparing results deletion:", error);
    }

    // 4. Delete the user document itself
    const userRef = admin.firestore().collection("users").doc(user_uid);
    batch.delete(userRef);

    // 5. Delete any access requests from this user
    try {
      const userData = (await admin.firestore().collection("users").doc(user_uid).collection("user").doc("data").get()).data();
      if (userData && userData.email) {
        const accessRequestsSnapshot = await admin
          .firestore()
          .collection("accessRequests")
          .where("email", "==", userData.email)
          .get();
        
        accessRequestsSnapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
      }
    } catch (error) {
      console.warn("Error preparing access requests deletion:", error);
    }

    // Execute the batch
    await batch.commit();

    // If possible, delete the user's authentication account
    try {
      await admin.auth().deleteUser(user_uid);
    } catch (authError) {
      console.warn("Auth user deletion failed (may not exist):", authError);
      // Continue anyway as the Firestore data is already deleted
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Error deleting user data" },
      { status: 500 }
    );
  }
}