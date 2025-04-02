import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, maxDuration * 0.9 * 1000);

  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${process.env.GOOGLE_PAGESPEED_INSIGHTS_API_KEY}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (res.status !== 200) {
      return NextResponse.json(
        { error: "Failed to fetch PageSpeed data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log(data);
    return NextResponse.json({ pageSpeedData: data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          message:
            "Fetching PageSpeed data took too long. The performance is suboptimal, take 3.0 for Performance Score. And add a note to the user that the performance score is not accurate due to the timeout.",
          type: "timeout",
          pageSpeedData: {
            lighthouseResult: {
              categories: {
                performance: {
                  score: 0.3,
                },
              },
            },
          },
        },
        { status: 200 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
