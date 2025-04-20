import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";
import { CreditsData } from "../../../../../auth_types";

export async function POST(req: NextRequest) {
  const { user_uid } = await req.json();

  if (!user_uid) {
    return new NextResponse("User UID is required", { status: 400 });
  }

  const userId = await validateTokenAndGetUserId(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const initialCreditsData: CreditsData = {
    credits: 5,
    maxCredits: 20,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  try {
    const creditsRef = admin
      .firestore()
      .collection("users")
      .doc(user_uid)
      .collection("user")
      .doc("credits");
    await creditsRef.set(initialCreditsData);
    return NextResponse.json(
      {
        creditsData: initialCreditsData,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data", error);
    return NextResponse.json(
      {
        message: "Error saving data",
        success: false,
      },
      { status: 500 }
    );
  }
}
