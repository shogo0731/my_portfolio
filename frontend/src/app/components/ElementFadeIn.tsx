"use client";

import { useEffect, useState } from "react";
import { useElementBoundaryObserver } from "../customHooks/useElementBoundaryObserver";
export default function ElementFadeIn({
  children,
  rootmargin,
  thresholdValue,
  classes,
}: {
  children: React.ReactNode;
  rootmargin: string;
  thresholdValue: number;
  classes: string;
}) {
  const [ref, boundary] = useElementBoundaryObserver(
    rootmargin,
    thresholdValue
  ) as [React.RefObject<HTMLDivElement>, string];
  const [className, setClassName] = useState(classes);

  useEffect(() => {
    if (boundary === "bottomIn") {
      setClassName(`${classes} visible`);
    }
  }, [boundary, classes]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
