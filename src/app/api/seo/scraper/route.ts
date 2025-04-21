import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export const maxDuration = 30;

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
      // For local development, use dynamic import
      const puppeteerModule = await import('puppeteer');
      const puppeteerFull = puppeteerModule.default;
      
      browser = await puppeteerFull.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    } else {
      // Production environment on Vercel
      console.log("Using @sparticuz/chromium for Vercel environment");
      try {
        // Dynamically import chromium to avoid issues during build
        const chromium = await import('@sparticuz/chromium');
        
        browser = await puppeteer.launch({
          args: [...chromium.default.args, "--hide-scrollbars", "--disable-web-security"],
          defaultViewport: chromium.default.defaultViewport,
          executablePath: await chromium.default.executablePath(),
          headless: true,
          // ignoreHTTPSErrors: true,
        });
      } catch (chromiumError) {
        console.error("Error launching Chromium:", chromiumError);
        
        // Fallback to simple fetch if Chromium is not available
        console.log("Falling back to simple fetch for URL:", url);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          return NextResponse.json(
            { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
            { status: response.status }
          );
        }
        
        const content = await response.text();
        return NextResponse.json({ content }, { status: 200 });
      }
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