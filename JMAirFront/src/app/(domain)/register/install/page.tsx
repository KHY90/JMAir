"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useAddressSearch } from "@/utils/useAddressSearch";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import Image from "next/image";

export default function InstallRequestPostPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { address, searchAddress, setAddress } = useAddressSearch();
  const [detailAddress, setDetailAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [password, setPassword] = useState("");
  const [firstDateTime, setFirstDateTime] = useState("");
  const [secondDateTime, setSecondDateTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      installName: name,
      installPhone: phone,
      installEmail: email,
      installAddress: address,
      installDetailAddress: detailAddress,
      installDescription: requestMessage,
      installPassword: password,
      reservationFirstDate: firstDateTime,
      reservationSecondDate: secondDateTime,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/post`,
        payload,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("에어컨 설치 신청이 완료되었습니다!");
      router.push("/search");
    } catch (error) {
      console.error("에어컨 설치 신청 오류:", error);
      alert("에어컨 설치 신청에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl relative mb-6 h-48 md:h-64 lg:h-80">
        <Image
          src="/images/character/request.webp"
          alt="견적 신청 베너"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">에어컨 이전/설치 신청</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl border border-gray-300 rounded-md p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* 이름 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 핸드폰 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="phone">
              핸드폰
            </label>
            <input
              id="phone"
              type="text"
              placeholder="01012345678"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, ""))
              }
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          </div>

          {/* 이메일 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 주소 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">주소</label>
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
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm md:text-base"
              >
                주소 검색
              </button>
            </div>
            <input
              type="text"
              name="detailAddress"
              placeholder="상세주소"
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
          </div>

          {/* 1차 희망 날짜 및 시간 */}
          <div className="col-span-2">
            <CustomDateTimePicker
              label="1차 희망 날짜 및 시간"
              value={firstDateTime}
              onChange={(val) => setFirstDateTime(val)}
            />
          </div>

          {/* 2차 희망 날짜 및 시간 */}
          <div className="col-span-2">
            <CustomDateTimePicker
              label="2차 희망 날짜 및 시간"
              value={secondDateTime}
              onChange={(val) => setSecondDateTime(val)}
            />
          </div>

          {/* 요청사항 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">
              요청사항 (최대 1000자)
            </label>
            <textarea
              placeholder={`설치 관련 요청사항을 입력하세요 (최대 1000자)
에어컨 종류 : 벽걸이형 / 스탠드형 / 투인원(벽걸이+스탠드) / 천장형 / 냉난방기 / 기타
에어컨 배관 형태 : 노출형(배관이 밖으로 노출된 형태) / 매립형(배관이 벽 속에 묻혀있는 형태) / 모르겠음
등등`}
              className="w-full border border-gray-300 rounded px-3 py-2 h-40 overflow-y-auto"
              maxLength={1000}
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="password">
              비밀번호 (4자리 숫자)
            </label>
            <input
              id="password"
              type="password"
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
        </div>

        {/* 작성하기 / 취소 버튼 */}
        <div className="flex space-x-4 justify-center mt-6">
          <button
            type="submit"
            className="w-[70%] bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            작성하기
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("신청을 취소하시겠습니까?")) router.back();
            }}
            className="w-[30%] bg-danger text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
