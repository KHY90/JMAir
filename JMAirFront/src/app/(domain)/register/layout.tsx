"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 사이드바 */}
      <aside className="w-full md:w-64 bg-white p-4 md:p-6 mt-2 border-b md:border-b-0 md:border-r border-gray-300">
        <h2 className="text-2xl font-bold mb-4 font-gowun text-center md:text-left">
          신청 메뉴
        </h2>
        <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4 justify-center md:justify-start">
          <Link
            href="/register/install"
            className={`block px-3 py-2 rounded hover:bg-primary hover:text-white font-gowun text-sm md:text-base ${
              pathname === "/register/estimate" ? "bg-primary text-white" : "text-black"
            }`}
          >
            견적 신청
          </Link>
          <Link
            href="/register/cleaning"
            className={`block px-3 py-2 rounded hover:bg-primary hover:text-white font-gowun text-sm md:text-base ${
              pathname === "/register/cleaning" ? "bg-primary text-white" : "text-black"
            }`}
          >
            세척 신청
          </Link>
          <Link
            href="/register/service"
            className={`block px-3 py-2 rounded hover:bg-primary hover:text-white font-gowun text-sm md:text-base ${
              pathname === "/register/service" ? "bg-primary text-white" : "text-black"
            }`}
          >
            A/S 신청
          </Link>
        </nav>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
