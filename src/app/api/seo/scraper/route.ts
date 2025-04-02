import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core"; // ONLY puppeteer-core in production
import chromium from "@sparticuz/chromium";

export const maxDuration = 15;

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    let browser = null;

    if (process.env.NODE_ENV === "development") {
      // For local development, puppeteer (full) is okay
      const puppeteerFull = require("puppeteer"); // Import puppeteer locally
      browser = await puppeteerFull.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true, // or false if you want to see the browser
      });
    } else {
      // Production environment
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless === "true",
      });
    }

    if (!browser) {
      return NextResponse.json(
        { error: "Failed to launch browser" },
        { status: 500 }
      );
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 }); // Adjust timeout as needed
    const content = await page.content();
    await browser.close();

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error); // More descriptive error message
    return NextResponse.json(
      { error: "Failed to scrape the content" },
      { status: 500 }
    );
  }
}
