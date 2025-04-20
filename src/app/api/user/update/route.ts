import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
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

    // Get user ID and updates to apply
    const { user_uid, updates, type } = await req.json();
    
    if (!user_uid) {
      return NextResponse.json(
        { error: "User UID is required" },
        { status: 400 }
      );
    }

    if (!updates) {
      return NextResponse.json(
        { error: "Updates are required" },
        { status: 400 }
      );
    }

    // Handle access request updates
    if (type === "access_request") {
      // Update the access request status
      const accessRequestRef = admin
        .firestore()
        .collection("accessRequests")
        .doc(user_uid);
      
      await accessRequestRef.update({
        status: updates.status,
        reviewedBy: adminDoc.data()?.email || adminId,
        reviewedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return NextResponse.json(
        { 
          message: `Access request status updated to ${updates.status}`,
          updatedFields: ["status", "reviewedBy", "reviewedAt"]
        },
        { status: 200 }
      );
    }

    // Don't allow an admin to change their own role from admin
    if (user_uid === adminId && 
        updates.role && 
        updates.role !== "admin") {
      return NextResponse.json(
        { error: "Cannot change your own admin role" },
        { status: 400 }
      );
    }

    // Update the user's data document
    const userDataRef = admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("user")
      .doc("data");
    
    // Only allow specific fields to be updated for security
    const allowedUpdates: Record<string, any> = {};
    
    if ('role' in updates) {
      allowedUpdates.role = updates.role;
    }
    
    if ('status' in updates) {
      allowedUpdates.status = updates.status;
    }
    
    await userDataRef.update({
      ...allowedUpdates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedBy: adminId
    });

    return NextResponse.json(
      { 
        message: "User updated successfully",
        updatedFields: Object.keys(allowedUpdates)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { 
        error: "Error updating user data",
        details: error instanceof Error ? error.message : String(error)  
      },
      { status: 500 }
    );
  }
}