import { useState, useEffect, useRef } from "react";

export function useElementBoundaryObserver(
  rootmargin: string,
  thresholdValue: number,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [boundary, setBoundary] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observerOptions = {
      rootMargin: rootmargin,
      threshold: thresholdValue,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBoundary(true);
        }
      });
    }, observerOptions);

    if (currentRef) {
      observer.observe(currentRef);
    }

    /* クリーンアップ関数　*/
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootmargin, thresholdValue]);

  return [ref, boundary];
}
