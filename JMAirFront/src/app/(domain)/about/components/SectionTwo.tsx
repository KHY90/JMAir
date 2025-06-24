"use client";
import { useIntersectFadeIn } from "@/hooks/useIntersectFadeIn";

export default function SectionTwo() {
  const { ref, isVisible } = useIntersectFadeIn();

  return (
    <section
      ref={ref}
      className={`
        w-full min-h-[50vh] px-4 py-10 flex flex-col items-center justify-center
        transition-opacity duration-2000 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <h2 className="text-3xl font-bold mb-4">아직도 에어컨 설치 / 이전 / 철거 업체를 못 찾으셨나요?</h2>
      <p className="max-w-2xl text-center leading-relaxed text-gray-700">
        전문 업체를 찾기 어려우셨다면, 저희가 도와드리겠습니다. 
        합리적인 비용과 꼼꼼한 시공으로 만족을 드리겠습니다.
      </p>
    </section>
  );
}
