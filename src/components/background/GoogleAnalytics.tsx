"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import path from "path";
import React, { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = {
  GA_MEAUSREMENT_ID: string;
};

const GoogleAnalytics = (props: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = path.join(pathname, searchParams.toString());

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", props.GA_MEAUSREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, props.GA_MEAUSREMENT_ID]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?js=${props.GA_MEAUSREMENT_ID}`}
      />
      <Script id="gtag-initialization" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('js', new Date());
          
          gtag('consent', 'default', {
            analytics_storage: 'denied',}
          );

          gtag('config', '${props.GA_MEAUSREMENT_ID}', {page_path: window.location.pathname, anonymize_ip: true});
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
