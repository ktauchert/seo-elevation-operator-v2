import admin from "@/config/firebaseAdminConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    type,
    user_uid,
    searchFilter,
  }: {
    type: string;
    user_uid: string;
    searchFilter?: { searchKey: string; searchWord: string };
  } = await req.json();
  if (!type || !user_uid) {
    return NextResponse.json(
      { message: "Type and URL are missing." },
      { status: 400 }
    );
  }
  console.log("🚀 ~ file: route.ts:20 ~ POST ~ type:", type);
  console.log("🚀 ~ file: route.ts:20 ~ POST ~ user_uid:", user_uid);
  try {
    if (type === "all") {
      const allResults = await admin
        .firestore()
        .collection("users")
        .doc(user_uid)
        .collection("results")
        .orderBy("updatedAt", "desc")
        .get();
      const results = allResults.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json({ results }, { status: 200 });
    }

    if (type === "search" && searchFilter) {
      const searchKey = searchFilter.searchKey;
      const searchWord = searchFilter.searchWord;
      const searchResults = await admin
        .firestore()
        .collection("users")
        .doc(user_uid)
        .collection("results")
        .orderBy("updatedAt", "desc")
        .where(searchKey, "==", searchWord)
        .get();
      const results = searchResults.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json({ results }, { status: 200 });
    }
    // Fallback for unsupported `type` values
    return NextResponse.json(
      { message: "Invalid type provided." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching SEO results", error);
    return NextResponse.json(
      { message: "Error fetching SEO results." },
      { status: 500 }
    );
  }
}
