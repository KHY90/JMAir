"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 배너 이미지 */}
      <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="Banner"
          width={1200}
          height={500}
          className="max-w-full h-auto object-contain"
          priority
        />
      </div>

      {/* 본문 콘텐츠 */}
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">에어컨 서비스</h1>
        <p>최고의 에어컨 설치 및 관리 서비스를 제공합니다.</p>
        <div>

        </div>
      </div>
    </div>
  );
}
