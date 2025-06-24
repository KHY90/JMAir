"use client";
import { useRef, useState, useEffect } from "react";

interface UseIntersectFadeInOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * 스크롤로 인해 섹션이 뷰포트에 들어오면 페이드 인 애니메이션을 트리거하는 훅
 */
export function useIntersectFadeIn({
  threshold = 0.1,
  rootMargin = "0px",
}: UseIntersectFadeInOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin]);

  return { ref, isVisible };
}
