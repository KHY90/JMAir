"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UsedPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [usageTime, setUsageTime] = useState("");
  const [year, setYear] = useState("");
  const [content, setContent] = useState("");
  const [productType, setProductType] = useState("벽걸이");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      Promise.all(
        fileArray.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.result) {
                  resolve(reader.result.toString());
                } else {
                  reject("파일을 읽는 중 오류가 발생했습니다.");
                }
              };
              reader.onerror = (err) => reject(err);
              reader.readAsDataURL(file);
            })
        )
      )
        .then((newImages) => {
          setImages((prev) => {
            const combined = [...prev, ...newImages];
            return combined.slice(0, 3);
          });
        })
        .catch((err) => {
          console.error("이미지 인코딩 오류:", err);
        });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      usedName: title,
      usedCost: price,
      usedTime: usageTime,
      usedYear: year,
      usedDescription: content,
      productType: productType,
      usedImages: images,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/admin/post`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess("중고 에어컨 등록이 완료되었습니다.");
      // 폼 초기화
      setTitle("");
      setPrice("");
      setUsageTime("");
      setYear("");
      setContent("");
      setProductType("벽걸이");
      setImages([]);
      router.push("/admin/used");
    } catch (error) {
      console.error("중고 에어컨 등록 오류:", error);
      setError("중고 에어컨 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8 font-gowun">
      <h1 className="text-2xl font-bold mb-6">중고 에어컨 등록</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl border border-gray-300 rounded-md p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* 제목 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 가격 */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="price">
              가격 (원)
            </label>
            <input
              id="price"
              type="number"
              placeholder="가격을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          {/* 사용기간 */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="usageTime">
              사용기간 (예: 2년)
            </label>
            <input
              id="usageTime"
              type="text"
              placeholder="예: 2년"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={usageTime}
              onChange={(e) => setUsageTime(e.target.value)}
              required
            />
          </div>

          {/* 연식 */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="year">
              연식 (예: 2021년형)
            </label>
            <input
              id="year"
              type="text"
              placeholder="예: 2021년형"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          {/* 제품 종류 */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium" htmlFor="productType">
              제품 종류
            </label>
            <select
              id="productType"
              name="productType"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="벽걸이">벽걸이</option>
              <option value="스탠드">스탠드</option>
              <option value="시스템">시스템</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 이미지 업로드 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="images">
              이미지 (최대 3장)
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {images.length > 0 && (
              <div className="mt-2 flex gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      alt={`미리보기 ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-danger text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 상세 설명 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="content">
              상세 설명
            </label>
            <textarea
              id="content"
              placeholder="제품 상세 설명을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2 h-40"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-6 flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            등록하기
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-500"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
