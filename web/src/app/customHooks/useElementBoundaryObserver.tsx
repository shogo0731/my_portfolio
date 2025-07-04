import { useState, useEffect, useRef } from "react";

export function useElementBoundaryObserver(
  rootmargin: string,
  thresholdValue: number
) {
  const ref = useRef<HTMLDivElement>(null);
  const [boundary, setBoundary] = useState("");

  useEffect(() => {
    const currentRef = ref.current;
    const observerOptions = {
      root: null,
      rootMargin: rootmargin,
      threshold: thresholdValue,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;

        if (rect.y <= 0) {
          setBoundary(entry.isIntersecting ? "topIn" : "topOut");
        } else if (entry.isIntersecting && rect.y > 0) {
          setBoundary("bottomIn");
        } else {
          setBoundary("bottomOut");
        }
      });
    }, observerOptions);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootmargin, thresholdValue]);

  return [ref, boundary];
}
