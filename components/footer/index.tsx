"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState<string>("00:00");

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const brusselsTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Europe/Brussels",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(brusselsTime);
    };

    // Update time immediately
    updateTime();

    // Update time every second instead of every minute
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-X w-full grid grid-cols-1 md:grid-cols-3 md:gap-4 text-small">
      <div className="text-secondary">
        February 2025 ©{" "}
        <Link href="/" className="hover:font-outline-1-secondary">
          Szymon Hernik
        </Link>
      </div>
      <div className="text-left md:text-center">
        <Link
          href="mailto:hello@szymonhernik.com"
          className="text-secondary hover:font-outline-1-secondary"
        >
          hello@szymonhernik.com
        </Link>
      </div>
      <div className="text-left md:text-right">It's {time} in Brussels</div>
    </div>
  );
};

export { Footer };
