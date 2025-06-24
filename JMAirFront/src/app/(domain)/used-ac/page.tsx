"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface UsedAcItem {
  id: number;
  title: string;
  price: number;
  usageTime: string;
  year: string;
  usedImage: string[];
  usedDescription: string;
}

export default function UsedAcListPage() {
  const router = useRouter();
  const [usedAcList, setUsedAcList] = useState<UsedAcItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/used`, { withCredentials: true })
      .then((response) => {
        interface UsedResponse {
          usedId: number;
          usedName: string;
          usedCost: number;
          usedTime: string;
          usedYear: string;
          usedImages: string[];
          usedDescription: string;
        }

        const list: UsedAcItem[] = response.data.map((item: UsedResponse) => ({
          id: item.usedId,
          title: item.usedName,
          price: item.usedCost,
          usageTime: item.usedTime,
          year: item.usedYear,
          usedImage: item.usedImages,
          usedDescription: item.usedDescription,
        }));
        setUsedAcList(list);
      })
      .catch((err) => {
        console.error("중고 에어컨 목록 조회 오류:", err);
        setError("중고 에어컨 목록을 불러오는 중 오류가 발생했습니다.");
      });
  }, []);

  const handleDetail = (id: number) => {
    router.push(`/used-ac/${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-6">중고 에어컨 목록</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usedAcList.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded p-4 hover:shadow-lg transition-shadow"
          >
            {/* 이미지 영역 */}
            <div className="relative w-full h-48 bg-gray-200 mb-4">
              {item.usedImage && item.usedImage.length > 0 ? (
                <Image
                  src={item.usedImage[0]}
                  alt={`미리보기 ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm flex items-center justify-center h-full">
                  400 x 300
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-grayDark mb-1">{item.price.toLocaleString()}원</p>
            <p className="text-grayDark mb-2">{item.usageTime}</p>
            <button
              onClick={() => handleDetail(item.id)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              상세보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
