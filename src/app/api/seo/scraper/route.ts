import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const maxDuration = 30; // Increase timeout to 30 seconds

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    console.log("Starting browser launch process...");
    console.log("Environment:", process.env.NODE_ENV);
    
    let browser = null;

    if (process.env.NODE_ENV === "development") {
      // For local development, use dynamic import instead of require
      const puppeteerModule = await import('puppeteer');
      const puppeteerFull = puppeteerModule.default;
      
      browser = await puppeteerFull.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new", // newer version uses "new" instead of true
      });
    } else {
      // Production environment on Vercel
      console.log("Using @sparticuz/chromium for Vercel environment");
      browser = await puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath() || process.env.CHROMIUM_REVISION || '',
        headless: true,
      });
    }

    if (!browser) {
      console.error("Failed to launch browser");
      return NextResponse.json(
        { error: "Failed to launch browser" },
        { status: 500 }
      );
    }

    console.log("Browser launched successfully");
    
    const page = await browser.newPage();
    console.log(`Navigating to URL: ${url}`);
    
    await page.goto(url, { 
      waitUntil: "networkidle2", 
      timeout: 20000 
    });
    
    console.log("Page loaded, extracting content");
    const content = await page.content();
    
    console.log("Closing browser");
    await browser.close();

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { 
        error: "Failed to scrape the content", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}