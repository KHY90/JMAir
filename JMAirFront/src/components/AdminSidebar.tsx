"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* 모바일 상단 햄버거 버튼 */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">관리자페이지</div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 사이드바 */}
      <div className={`bg-gray-800 text-white md:flex flex-col w-64 min-h-screen fixed md:static z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 text-xl font-bold border-b border-gray-700 hidden md:block">
          관리자페이지
        </div>
        <nav className="mt-4 flex-1">
          {[
            { href: "/admin/estimate", label: "견적 신청 관리" },
            { href: "/admin/as", label: "A/S 신청 관리" },
            { href: "/admin/used", label: "중고에어컨 신청 관리" },
            { href: "/admin/member", label: "회원 관리" },
            { href: "/admin/notice", label: "공지사항 관리" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={handleClose}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
