import { useEffect, useState } from "react";

type UseMdScrollTriggeredScaleOptions = {
  sentinelId: string;
};

export function useMdScrollTriggeredScale({
  sentinelId,
}: UseMdScrollTriggeredScaleOptions) {
  const breakpointQuery = "(min-width: 768px)";
  const [isMdUp, setIsMdUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpointQuery);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMdUp(event.matches);

    setIsMdUp(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpointQuery]);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // At scroll top the sentinel is fully visible (ratio 1).
        setIsAtTop(entry.isIntersecting && entry.intersectionRatio === 1);
      },
      {
        threshold: [1],
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [sentinelId]);

  if (!isMdUp) return 1;
  return isAtTop ? 1 : 2;
}
