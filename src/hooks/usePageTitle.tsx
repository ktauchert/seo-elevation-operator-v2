import { usePathname } from "next/navigation";
import React from "react";

const titles: Record<string, string> = {
  "/": "SEO Elevation Operator",
  "/elevation/analysis": "Elevation — SEO Analysis",
  "/elevation": "Elevation — Dashboard",
  "/elevation/summary": "Elevation — All Elevations",
  "/blog": "Blog",
  "/login": "Login",
  "/register": "Register",
};

const usePageTitle = () => {
  const pathname = usePathname();

  const title = React.useMemo(() => {
    const title = titles[pathname] || "SEO Elevation Operator";
    return title;
  }, [pathname]);

  return { title };
};

export default usePageTitle;
