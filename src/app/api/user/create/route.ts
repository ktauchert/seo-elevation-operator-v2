import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "../../../../../auth_types";

export interface CreateResponse {
  message?: string;
  userData?: UserData;
  error?: string;
}

export async function POST(req: NextRequest) {
  const { session_user } = await req.json();
  if (!session_user) {
    return NextResponse.json(
      { error: "Session User is required." },
      { status: 400 }
    );
  }

  const initialUserData = {
    email: session_user.email,
    image: session_user.image ?? "",
    displayName: session_user.name,
    firstName: session_user.name.split(" ")[0],
    lastName: session_user.name.split(" ")[1],
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const userDocRef = admin
    .firestore()
    .collection("users")
    .doc(session_user.id)
    .collection("user")
    .doc("data");

  // set initial userdata into ref
  try {
    await userDocRef.set(initialUserData, { merge: true });
    return NextResponse.json(initialUserData, { status: 200 });
  } catch (error) {
    console.error("Error setting user data", error);
    return NextResponse.json(
      { error: "Error setting user data." },
      { status: 500 }
    );
  }
}
