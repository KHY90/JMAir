"use client";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import NaverLoginButton from "@/components/NaverLogin";
import KakaoLoginButton from "@/components/KakaoLoginButton";

export default function LoginPage() {
  const { formData, errorMessage, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

        {/* 아이디 & 비밀번호 로그인 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userLogin"
            placeholder="아이디"
            value={formData.userLogin}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            로그인
          </button>
        </form>

        {/* 소셜 로그인 영역 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">소셜 로그인</p>
          <div className="flex space-x-2 mt-2">
            {/* 카카오 로그인 버튼 */}
            <KakaoLoginButton />
            {/* 네이버 로그인 버튼 */}
            <NaverLoginButton />
          </div>
        </div>

        {/* 회원가입 링크 */}
        <p className="mt-4 text-center text-gray-600">
          계정이 없으신가요?{" "}
          <Link href="/join" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
        {/* 아이디/ 비번 찾기 */}
        <p className="mt-4 text-center text-gray-600">
          아이디/비밀번호가 기억나지 않으시나요?{" "}
          <br />
          <Link href="/find" className="text-blue-500 hover:underline">
            아이디 / 비밀번호 찾기
          </Link>
        </p>
      </div>
    </div>
  );
}
