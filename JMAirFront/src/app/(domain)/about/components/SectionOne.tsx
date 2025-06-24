"use client";
import Image from "next/image";
import { useIntersectFadeIn } from "@/hooks/useIntersectFadeIn";

export default function SectionOne() {
  const { ref, isVisible } = useIntersectFadeIn();

  return (
    <section
      ref={ref}
      className={`
        w-full min-h-[50vh] px-4 py-10 flex flex-col items-center justify-center
        transition-opacity duration-700 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="mb-4">
        <Image
          src="/images/character/character1.webp"
          alt="Character Image"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      <h2 className="text-3xl font-bold mb-4">정직, 성실을 바탕으로</h2>
      <p className="max-w-2xl text-center leading-relaxed text-gray-700">
        저희는 정직과 성실을 바탕으로 항상 고객님께 최상의 서비스를 제공하기 위해 노력하고 있습니다.
        믿을 수 있는 기술력과 꼼꼼한 시공으로, 최고의 만족을 드리겠습니다.
      </p>
    </section>
  );
}
