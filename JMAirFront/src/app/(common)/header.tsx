"use client";
import Link from "next/link";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLogout } from "@/utils/useLogout";
import authStore from "@/utils/authStore";

const Header = observer(() => {
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const isAdmin =
    authStore.isAuthenticated &&
    authStore.user &&
    ["SUPERADMIN", "ADMIN", "ADMINWATCHER", "ENGINEER"].includes(authStore.user.userGrade);

  return (
    <header className="bg-white shadow-md relative">
      <div className="px-6 py-2 bg-gray-100 flex justify-end items-center space-x-4">
        {authStore.isAuthenticated && authStore.user ? (
          <>
            <span className="text-gray-700 text-sm sm:text-base">
              {authStore.user.userName}님, 환영합니다!
            </span>
            <Link href="/mypage" className="hover:text-blue-400 text-sm sm:text-base">
              마이페이지
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-blue-400 text-sm sm:text-base">
                관리자
              </Link>
            )}
            <button onClick={handleLogout} className="hover:text-red-400 text-sm sm:text-base">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-400 text-sm sm:text-base">
              로그인
            </Link>
            <Link href="/join" className="hover:text-blue-400 text-sm sm:text-base">
              회원가입
            </Link>
          </>
        )}
      </div>

      <div className="px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="font-bold text-2xl">진명에어컨</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/about" className="hover:text-blue-500 text-base">
            회사소개
          </Link>
          <Link href="/cost" className="hover:text-blue-500 text-base">
            설치가격
          </Link>
          <Link href="/used-ac" className="hover:text-blue-500 text-base">
            중고에어컨
          </Link>
          <Link href="/register/install" className="hover:text-blue-500 text-base">
            견적 신청
          </Link>
          <Link href="/search" className="hover:text-blue-500 text-base">
            신청 내역
          </Link>
          <Link href="/notice" className="hover:text-blue-500 text-base">
            공지사항
          </Link>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-3xl focus:outline-none">
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              회사소개
            </Link>
            <Link href="/cost" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              설치가격
            </Link>
            <Link href="/used-ac" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              중고에어컨
            </Link>
            <Link href="/register/install" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              견적 신청
            </Link>
            <Link href="/search" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              신청 내역
            </Link>
            <Link href="/notice" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 text-lg">
              공지사항
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
});

export default Header;
