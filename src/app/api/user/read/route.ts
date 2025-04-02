import { NextRequest, NextResponse } from "next/server";
import admin from "@/config/firebaseAdminConfig";

export async function POST(req: NextRequest) {
  const { user_uid } = await req.json();
  if (!user_uid) {
    return NextResponse.json(
      { error: "User UID is required" },
      { status: 400 }
    );
  }

  // Get user data with admin SDK from users/user_uid
  const userDocRef = admin
    .firestore()
    .collection("users")
    .doc(user_uid)
    .collection("user")
    .doc("data");
  const userDoc = await userDocRef.get();

  if (!userDoc.exists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } else {
    const userData = userDoc.data();
    return NextResponse.json(userData, { status: 200 });
  }
}
