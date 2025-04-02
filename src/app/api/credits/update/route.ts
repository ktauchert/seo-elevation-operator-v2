import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";
import { CreditsData } from "../../../../../auth_types";

export async function POST(req: NextRequest) {
  const { newCredit } = await req.json();

  const userId = await validateTokenAndGetUserId(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const creditsData: Partial<CreditsData> = {
    credits: newCredit,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  try {
    const creditsRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("user")
      .doc("credits");
    await creditsRef.update(creditsData);
    return NextResponse.json(
      {
        creditsData,
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
