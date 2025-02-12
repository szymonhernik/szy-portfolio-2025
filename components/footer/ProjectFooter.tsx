"use client";

import { useEffect, useRef, useState } from "react";

import { Footer } from ".";

export default function ProjectFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px" },
    );

    const currentFooter = footerRef.current;
    if (currentFooter) {
      observer.observe(currentFooter);
    }

    return () => {
      if (currentFooter) {
        observer.unobserve(currentFooter);
      }
    };
  }, []);
  return (
    <>
      {isVisible && (
        <div className="fixed right-8 bottom-8 z-10 transition-all duration-300 lg:right-12 lg:bottom-12">
          Next: Lux Cache
        </div>
      )}

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
