import admin from "@/config/firebaseAdminConfig";
import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_uid, elevation_id }: { user_uid: string; elevation_id: string } =
    await req.json();

  try {
    // Get user ID from request body
    // const { user_uid } = await req.json();

    // if (!user_uid) {
    //   return NextResponse.json(
    //     { message: "User ID is missing." },
    //     { status: 400 }
    //   );
    // }

    // Validate the user ID from the token
    const validatedUserId = await validateTokenAndGetUserId(req);
    if (!validatedUserId || validatedUserId !== user_uid) {
      return NextResponse.json(
        { message: "Unauthorized access." },
        { status: 401 }
      );
    }

    // Check if the user is an admin (admins can view any elevation)
    let isAdmin = false;
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("user")
      .doc("data")
      .get();

    if (userDoc.exists && userDoc.data()?.role === "admin") {
      isAdmin = true;
    }

    // First check if the elevation exists in the user's collection
    const elevationRef = admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("results")
      .doc(elevation_id);

    const elevationDoc = await elevationRef.get();

    if (elevationDoc.exists) {
      return NextResponse.json(
        {
          elevation: {
            id: elevationDoc.id,
            ...elevationDoc.data(),
          },
        },
        { status: 200 }
      );
    }

    // If the user is admin, try to find the elevation in any user's collection
    if (isAdmin) {
      // Get all users
      const usersSnapshot = await admin.firestore().collection("users").get();

      for (const user of usersSnapshot.docs) {
        const elevationDoc = await admin
          .firestore()
          .collection("users")
          .doc(user.id)
          .collection("results")
          .doc(elevation_id)
          .get();

        if (elevationDoc.exists) {
          return NextResponse.json(
            {
              elevation: {
                id: elevationDoc.id,
                ...elevationDoc.data(),
                ownerId: user.id, // Include the owner ID for admin context
              },
            },
            { status: 200 }
          );
        }
      }
    }

    // If we get here, the elevation doesn't exist or the user doesn't have access
    return NextResponse.json(
      { message: "Elevation not found or access denied." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching elevation data:", error);
    return NextResponse.json(
      { message: "Error fetching elevation data." },
      { status: 500 }
    );
  }
}
