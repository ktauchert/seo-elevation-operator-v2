import admin from "@/config/firebaseAdminConfig";
import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "../../../../../auth_types";

export async function POST(req: NextRequest) {
  try {
    // Validate the requesting user is an admin
    const adminId = await validateTokenAndGetUserId(req);
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const { filter } = await req.json();

    // Initialize counters
    let adminCount = 0;
    let regularUserCount = 0;
    let pendingCount = 0;
    const users = [];
    const processedEmails = new Set();

    // Get all users
    const usersRef = admin.firestore().collection("users");
    const usersSnapshot = await usersRef.get();

    // Process each user and collect stats
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;

      // Get user's data document
      const userDataDoc = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("user")
        .doc("data")
        .get();

      if (userDataDoc.exists) {
        const userData = userDataDoc.data() as UserData;

        // Count user by role
        if (userData.role === "admin") {
          adminCount++;
        } else {
          regularUserCount++;
        }

        // Add email to processed set to avoid duplicates
        if (userData.email) {
          processedEmails.add(userData.email);
        }

        // Count user's elevations
        let elevationCount = 0;
        try {
          const elevationsRef = admin
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("results");

          const elevationsSnapshot = await elevationsRef.count().get();
          elevationCount = elevationsSnapshot.data().count;
        } catch (error) {
          // If count() is not available, fall back to getting all docs
          try {
            const elevationsSnapshot = await admin
              .firestore()
              .collection("users")
              .doc(userId)
              .collection("results")
              .get();

            elevationCount = elevationsSnapshot.size;
            console.log('Error counting elevations:', error);
          } catch (err) {
            console.warn(`Error counting elevations for user:`, err);
          }
        }

        // Create user object based on actual UserData structure
        const user = {
          id: userId,
          displayName: userData.displayName ?? "Unknown",
          email: userData.email,
          role: userData.role || "user",
          // Determine status based on access request or default to active
          status: "active", // Default for existing users
          createdAt: 'not existing',
          updatedAt: userData.updatedAt,
          lastLogin: 'not existing',
          elevationCount: elevationCount,
          image: null,
        };

        // Apply filter based on role only since we're using a different status model
        if (
          filter === "all" ||
          (filter === "admin" && user.role === "admin") ||
          filter === "active"
        ) {
          users.push(user);
        }
      }
    }

    // Handle access requests separately - these are pending users
    if (filter === "all" || filter === "pending") {
      const accessRef = admin
        .firestore()
        .collection("accessRequests")
        .where("status", "==", "pending");

      const accessSnapshot = await accessRef.get();

      for (const accessDoc of accessSnapshot.docs) {
        const request = accessDoc.data();

        // Check if this email is already processed (not an existing user)
        if (request.email && !processedEmails.has(request.email)) {
          pendingCount++;

          // Add to users list as pending requests
          users.push({
            id: "pending_" + accessDoc.id,
            displayName: request.displayName || request.name || "Unknown",
            email: request.email,
            role: "user", // Default role for new users
            status: "pending", // This is a pending access request
            createdAt: request.requestedAt,
            lastLogin: null,
            elevationCount: 0,
            accessRequestId: accessDoc.id,
          });
        }
      }
    }

    return NextResponse.json(
      {
        users,
        stats: {
          total: usersSnapshot.size + pendingCount,
          admins: adminCount,
          regularUsers: regularUserCount,
          pending: pendingCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Error fetching users",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
