import { NextRequest, NextResponse } from "next/server";
import admin from "@/config/firebaseAdminConfig";
import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";

export async function GET(req: NextRequest) {
  try {
    // Check if the user is authenticated and an admin
    const user_uid = await validateTokenAndGetUserId(req);
    if (!user_uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the user is an admin
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("user")
      .doc("data")
      .get();

    if (!userDoc.exists || userDoc.data()?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Get pending access requests count
    const pendingAccessRef = admin
      .firestore()
      .collection("accessRequests")
      .where("status", "==", "pending");
    const pendingSnapshot = await pendingAccessRef.count().get();
    const pendingCount = pendingSnapshot.data().count;

    // Get total users count
    const usersRef = admin.firestore().collection("users");
    const usersSnapshot = await usersRef.count().get();
    const usersCount = usersSnapshot.data().count;

    // Get total elevations count - Use collection group query
    // Option 1: Use a collection group query if you've enabled it
    let elevationsCount = 0;
    try {
      const resultsCollectionGroup = admin
        .firestore()
        .collectionGroup("results");
      const elevationsSnapshot = await resultsCollectionGroup.count().get();
      elevationsCount = elevationsSnapshot.data().count;
    } catch (error) {
      console.warn(
        "Collection group query failed, using alternative method:",
        error
      );

      // Option 2: If collection group query doesn't work, fetch all users and count their results
      try {
        const usersSnapshot = await admin.firestore().collection("users").get();

        // Process in batches to avoid memory issues
        const batchPromises = [];
        for (const userDoc of usersSnapshot.docs) {
          batchPromises.push(
            (async () => {
              const resultsRef = admin
                .firestore()
                .collection("users")
                .doc(userDoc.id)
                .collection("results");
              const resultsCountSnapshot = await resultsRef.count().get();
              return resultsCountSnapshot.data().count;
            })()
          );
        }

        // Sum up all the counts
        const counts = await Promise.all(batchPromises);
        elevationsCount = counts.reduce((acc, count) => acc + count, 0);
      } catch (countError) {
        console.error("Error counting results across users:", countError);
      }
    }

    // Get recent access requests
    const recentAccessRef = admin
      .firestore()
      .collection("accessRequests")
      .orderBy("requestedAt", "desc")
      .limit(5);
    const recentSnapshot = await recentAccessRef.get();
    const recentRequests = recentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        pendingAccessRequests: pendingCount,
        totalUsers: usersCount,
        totalElevations: elevationsCount,
        recentAccessRequests: recentRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in admin dashboard API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
