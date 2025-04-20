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

    const { action, filter, requestId, status } = await req.json();

    // Handle different actions
    if (action === "list") {
      // Build the query based on filter
      let queryRef;
      if (filter !== "all") {
        queryRef = admin
          .firestore()
          .collection("accessRequests")
          .where("status", "==", filter)
          .orderBy("requestedAt", "desc");
      } else {
        queryRef = admin
          .firestore()
          .collection("accessRequests")
          .orderBy("requestedAt", "desc");
      }

      const snapshot = await queryRef.get();
      
      const requests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({ requests }, { status: 200 });
    }
    
    if (action === "update" && requestId && status) {
      // Update an access request status
      await admin
        .firestore()
        .collection("accessRequests")
        .doc(requestId)
        .update({
          status,
          reviewedBy: adminDoc.data()?.email || adminId,
          reviewedAt: admin.firestore.FieldValue.serverTimestamp()
        });

      return NextResponse.json({
        message: `Access request ${requestId} updated to ${status}`,
        requestId,
        status
      }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing access request:", error);
    return NextResponse.json(
      { 
        error: "Error processing access request", 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}