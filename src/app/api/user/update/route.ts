import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newUserData } = await req.json();

  const userId = await validateTokenAndGetUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!newUserData) {
    return { status: 400, json: { error: "User data is required." } };
  }

  try {
    const userDocRef = admin.firestore().collection("users").doc(userId);
    await userDocRef.update(newUserData);
    return NextResponse.json(
      { message: "User data updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user data." },
      { status: 500 }
    );
  }
}
