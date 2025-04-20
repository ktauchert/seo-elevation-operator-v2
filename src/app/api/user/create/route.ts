import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebaseClientConfig";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.session_user || !body.session_user.id) {
      return NextResponse.json(
        { error: "Missing session_user or user ID" },
        { status: 400 }
      );
    }

    const { session_user } = body;

    // Normalize names
    const nameParts = session_user.name?.split(" ") || ["", ""];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const userData = {
      email: session_user.email,
      image: session_user.image || "",
      displayName: session_user.name || "",
      firstName,
      lastName,
      role: "user",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    console.log("Creating user:", session_user.id, userData);

    // Use setDoc to create or update the user document
    await setDoc(doc(db, "users", session_user.id), userData);

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        error: "Failed to create user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
