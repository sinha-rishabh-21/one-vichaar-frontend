"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import default styles

NProgress.configure({ showSpinner: false, speed: 500 });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => NProgress.done(), 300); // Delays completion
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
}
