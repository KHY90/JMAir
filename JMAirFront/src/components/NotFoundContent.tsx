"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="relative w-4/5 h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/images/character/404error.webp"
          alt="404 Error"
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
