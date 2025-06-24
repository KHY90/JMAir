"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useAddressSearch } from "@/utils/useAddressSearch";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import Image from "next/image";

export default function CleaningPage() {
  const router = useRouter();
  const { address, searchAddress, setAddress } = useAddressSearch();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    detailAddress: "",
    productType: "벽걸이형",
    note: "",
    reservationFirstDate: "",
    reservationSecondDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      cleanName: formData.name,
      cleanNumber: formData.phone,
      cleanEmail: formData.email,
      productType: formData.productType,
      cleanDescription: formData.note,
      cleanAdress: address,
      cleanDetailAdress: formData.detailAddress,
      cleanPassword: password,
      cleanFirstReservationTime: formData.reservationFirstDate,
      cleanSecondReservationTime: formData.reservationSecondDate,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/post`,
        payload,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("에어컨 세척 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        detailAddress: "",
        productType: "벽걸이형",
        note: "",
        reservationFirstDate: "",
        reservationSecondDate: "",
      });
      setAddress("");
      setPassword("");
      router.push("/");
    } catch (err: unknown) {
      console.error("에어컨 세척 신청 오류:", err);
      setError("에어컨 세척 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 font-gowun">
      {/* 베너 이미지 */}
      <div className="w-full max-w-xl relative h-64 mb-6">
        <Image
          src="/images/character/cleanbanner.webp"
          alt="청소 베너"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">에어컨 세척 신청</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-300 rounded-md p-6"
      >
        {/* 에러/성공 메시지 */}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        {/* 이름 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="name">
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="이름을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 연락처 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="phone">
            연락처
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="01012345678"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@example.com"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* 주소 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">주소</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="address"
              placeholder="기본주소"
              className="w-3/4 sm:flex-1 border border-gray-300 rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={searchAddress}
              className="border border-gray-400 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm md:text-base"
            >
              주소 검색
            </button>
          </div>
          <input
            type="text"
            name="detailAddress"
            placeholder="상세주소"
            className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
            value={formData.detailAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* 제품 종류 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">제품 종류</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="벽걸이">벽걸이</option>
            <option value="스탠드">스탠드</option>
            <option value="시스템">시스템</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 1차 희망 날짜 및 시간 */}
        <CustomDateTimePicker
          label="1차 희망 날짜 및 시간"
          value={formData.reservationFirstDate}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, reservationFirstDate: value }))
          }
        />

        {/* 2차 희망 날짜 및 시간 */}
        <CustomDateTimePicker
          label="2차 희망 날짜 및 시간"
          value={formData.reservationSecondDate}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, reservationSecondDate: value }))
          }
        />

        {/* 요청사항 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            요청사항 (최대 1000자)
          </label>
          <textarea
            name="note"
            placeholder="에어컨 세척 시 요청하시는 사항을 기입해주세요."
            className="w-full border border-gray-300 rounded px-3 py-2 h-40 overflow-y-auto"
            maxLength={1000}
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="password">
            비밀번호 (4자리 숫자)
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={4}
            minLength={4}
            pattern="\d{4}"
            required
          />
        </div>

        {/* 작성하기 / 취소 버튼 */}
        <div className="mt-6 flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            작성하기
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("신청을 취소하시겠습니까?")) router.back();
            }}
            className="bg-danger text-white px-6 py-2 rounded-md hover:bg-red-800"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
