"use client";
import Link from "next/link";

export default function FindPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl font-bold">아이디 / 비밀번호 찾기</h2>
        <p>
          현재 온라인으로 아이디와 비밀번호를 찾는 기능은 준비 중입니다.
          가입하신 정보를 확인하려면
          <br />
          <span className="font-semibold">대표번호 02-0000-0000</span> 로 연락해주세요.
        </p>
        <Link href="/login" className="block bg-primary text-white py-2 rounded hover:bg-blue-700">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}