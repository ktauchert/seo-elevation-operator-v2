import { validateTokenAndGetUserId } from "@/components/utils/auth-utils";
import admin from "@/config/firebaseAdminConfig";
import { messaging } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  if (!data) {
    return NextResponse.json({ error: "Data is required." }, { status: 400 });
  }

  const userId = await validateTokenAndGetUserId(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { url, seoAnalysisResult, seoScoringResult, language } = data;
  if (!url || !userId || !seoAnalysisResult || !seoScoringResult || !language) {
    return NextResponse.json(
      { error: "Required fields are missing." },
      { status: 400 }
    );
  }

  // users -> user_uid -> seoResults -> results
  const seoResultRef = admin
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("results");
  const seoResultData = {
    url,
    result: seoAnalysisResult,
    scoring: seoScoringResult,
    overallScore: seoScoringResult.overallScore,
    language,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // set seo result into ref
  try {
    await seoResultRef.add(seoResultData);
    return NextResponse.json(
      { message: "SEO Result has been saved." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting SEO result", error);
    return NextResponse.json(
      { error: "Error setting SEO result." },
      { status: 500 }
    );
  }
}
