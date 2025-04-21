import { NextRequest, NextResponse } from "next/server";
import admin from "@/config/firebaseAdminConfig";
import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";

export async function POST(req: NextRequest) {
  const { user_uid } = await req.json();
  
  if (!user_uid) {
    return NextResponse.json(
      { error: "User UID is required" },
      { status: 400 }
    );
  }

  // Validate the token (missed in the original code)
  const validatedUid = await validateTokenAndGetUserId(req);
  if (!validatedUid) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    
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
  } catch (error) {
    console.error("Error in user/read API route:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error) 
      }, 
      { status: 500 }
    );
  }
}