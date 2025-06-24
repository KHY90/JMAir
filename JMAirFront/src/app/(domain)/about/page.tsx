"use client";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="bg-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">회사 소개</h1>
        <p className="text-gray-600 min-h-[20vh]">
          진명에어컨에 오신 것을 환영합니다.
        </p>
      </div>

      {/* 스크롤 시 페이드 인될 섹션들 */}
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
