"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer({ className }: { className?: string }) {
  return (
    <div className={clsx("z-[2] mt-X grid w-full grid-cols-1 bg-background p-4 sm:text-small md:grid-cols-3 md:gap-4 lg:text-small-md", className)}>
      <div className="text-secondary">
        <Link href="/" className="hover:font-outline-1-secondary">
          Szymon Eda Hernik
        </Link>{" "}
        <span className="text-secondary">©</span> 2025
      </div>
      <div className="text-left max-md:hidden md:text-center">
        {" "}
        <Link href="mailto:hello@szymonhernik.com" className="text-secondary hover:font-outline-1-secondary">
          hello@szymonhernik.com
        </Link>
      </div>
      <div className="text-left max-md:hidden md:text-right">
        <TimeInBrussels />
      </div>
    </div>
  );
}

export function TimeInBrussels() {
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

  return <>It's {time} in Brussels</>;
}
