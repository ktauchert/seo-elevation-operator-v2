import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_uid } = await req.json();

  if (!user_uid) {
    return new NextResponse("User UID is required", { status: 400 });
  }

  const userId = await validateTokenAndGetUserId(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const creditsRef = admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("user")
      .doc("credits");
    const credits = await creditsRef.get();
    if (credits.exists) {
      return NextResponse.json(
        {
          
          creditsData: credits.data(),
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "No credits present",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error reading data", error);
    return NextResponse.json(
      {
        message: "Error reading data",
        success: false,
      },
      { status: 500 }
    );
  }
}
