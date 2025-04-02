"use client";
import { getLocalStorage, setLocalStorage } from "@/helper/storage-helper";
import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const consent = getLocalStorage("cookie_consent", null);
    setCookieConsent(consent);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
    }

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  if (isLoading || cookieConsent !== null) {
    return null;
  }

  console.log(cookieConsent ? "hidden" : "block");
  return (
    <>
      <div className="fixed h-screen w-screen z-[99999] top-0 left-0 right-0 backdrop-blur-sm bg-slate-950/40"></div>
      <div
        className={`fixed bottom-5 left-0 md:translate-x-1/2 w-full my-4  md:w-1/2 h-auto bg-slate-300 flex flex-col items-center justify-evenly p-5 shadow-2xl rounded-2xl z-[100000] ${
          cookieConsent ? "hidden" : "block"
        }`}
      >
        <div className="text-lg md:text-lg lg:text-2xl hyphens-auto mb-5 flex flex-col items-center">
          <p>If you dont wish to accept cookies, you can decline.</p>
          <p>We use cookies to improve your experience on our site.</p>
        </div>
        <div>
          <button
            className="md:text-2xl text-lg py-2 px-5 mx-4 rounded-md hover:bg-green-700  text-slate-100 bg-green-900 "
            onClick={() => setCookieConsent(true)}
          >
            Accept
          </button>
          <button
            className="md:text-2xl text-lg py-2 px-5 mx-4 rounded-md hover:bg-orange-500 text-slate-100 hover:text-slate-900 bg-orange-700"
            onClick={() => setCookieConsent(false)}
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
