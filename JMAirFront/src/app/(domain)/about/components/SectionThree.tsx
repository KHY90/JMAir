"use client";
import { useIntersectFadeIn } from "@/hooks/useIntersectFadeIn";

export default function SectionThree() {
  const { ref, isVisible } = useIntersectFadeIn();

  return (
    <section
      ref={ref}
      className={`
        w-full min-h-[50vh] px-4 py-10 flex flex-col items-center justify-center
        transition-opacity duration-3000 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <h2 className="text-3xl font-bold mb-4">왜 저희를 선택해야 할까요?</h2>
      <ul className="max-w-2xl text-center text-gray-700 space-y-2 leading-relaxed">
        <li>✓ 풍부한 현장 경험</li>
        <li>✓ 꼼꼼한 시공과 A/S</li>
        <li>✓ 합리적인 비용</li>
        <li>✓ 고객 맞춤형 컨설팅</li>
      </ul>
    </section>
  );
}
