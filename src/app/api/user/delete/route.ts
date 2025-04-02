import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_uid } = await req.json();
  if (!user_uid) {
    return NextResponse.json(
      { error: "User UID is required" },
      { status: 400 }
    );
  }

  try {
    // delete user data with admin SDK from users/user_uid
    const userDocRef = admin.firestore().collection("users").doc(user_uid);
    await userDocRef.delete();
    return NextResponse.json(
      { message: "User data deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting user data." },
      { status: 500 }
    );
  }
}
