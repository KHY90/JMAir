"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useJoinForm } from "@/hooks/useJoinForm";
import axios from "axios";

export default function JoinPage() {
  const router = useRouter();
  const {
    formData,
    errors,
    isUserLoginChecked,
    handleChange,
    handleCheckUserLogin,
    setErrors,
  } = useJoinForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      userLogin: formData.userLogin ? errors.userLogin : "아이디는 필수입니다.",
      userName: formData.userName ? "" : "이름은 필수입니다.",
      password: formData.password ? errors.password : "비밀번호는 필수입니다.",
      confirmPassword: formData.confirmPassword ? errors.confirmPassword : "",
      phoneNumber: formData.phoneNumber ? errors.phoneNumber : "핸드폰 번호는 필수입니다.",
      email: formData.email ? errors.email : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    if (!isUserLoginChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/join`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    const confirmCancel = window.confirm("회원가입을 취소하시겠습니까?");
    if (confirmCancel) {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 입력 + 중복 확인 */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="userLogin"
              placeholder="아이디 (영문자로 시작, 4~16자)"
              value={formData.userLogin}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleCheckUserLogin}
              className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600"
            >
              중복 확인
            </button>
          </div>
          {errors.userLogin && <p className="text-red-500 text-sm">{errors.userLogin}</p>}

          {/* 이름 입력 */}
          <input
            type="text"
            name="userName"
            placeholder="이름"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}

          {/* 비밀번호 입력 */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호 (영문+숫자+특수문자 포함 8~16자)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* 비밀번호 확인 */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          {/* 전화번호 입력 */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="전화번호(숫자만 입력해 주세요.)"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

          {/* 이메일 입력 */}
          <input
            type="email"
            name="email"
            placeholder="이메일 (선택)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* 회원가입 & 취소 버튼 */}
          <div className="flex space-x-2 w-full">
            <button
              type="submit"
              className="w-[70%] bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-[30%] bg-gray-300 text-black py-3 rounded-md hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
