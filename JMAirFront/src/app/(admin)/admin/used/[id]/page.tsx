"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { getUsedStateText } from "@/utils/transform";

interface UsedDTO {
  usedId: number;
  usedName: string;
  usedCost: string;
  productType: string;
  usedDescription: string;
  usedYear: string;
  usedTime: string;
  usedPostTime: string;
  usedEditTime: string;
  usedEndTime: string;
  usedState: string;
  usedImages: string[];
  usedNote?: string;
}

export default function AdminUsedDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [detail, setDetail] = useState<UsedDTO | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${id}`,
          { withCredentials: true }
        );
        setDetail(res.data);
      } catch (err) {
        console.error("중고 에어컨 상세 조회 오류:", err);
        setError("중고 에어컨 상세 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${id}/delete`,
        { withCredentials: true }
      );
      alert("삭제되었습니다.");
      router.back();
    } catch (err) {
      console.error("삭제 요청 오류:", err);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!detail) {
    return <div className="min-h-screen flex items-center justify-center">로딩중...</div>;
  }

  const mainImage = detail.usedImages && detail.usedImages.length > 0 ? detail.usedImages[0] : null;

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 font-gowun">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{detail.usedName}</h1>
            <p className="text-gray-500">등록일: {new Date(detail.usedPostTime).toLocaleDateString("ko-KR")}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => router.push(`/admin/used/${id}/edit`)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            {mainImage ? (
              <div className="relative w-full h-64 mb-4">
                <Image src={mainImage} alt="메인 이미지" fill sizes="(max-width:768px) 100vw,50vw" className="object-contain" />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-500">600 x 400</span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p>가격: {Number(detail.usedCost).toLocaleString()}원</p>
            <p>사용 기간: {detail.usedTime}</p>
            <p>연식: {detail.usedYear}</p>
            <p>종류: {detail.productType}</p>
            <p>상태: {getUsedStateText(detail.usedState)}</p>
          </div>
        </div>
        <div className="mt-8 bg-gray-50 p-4 border border-gray-200 rounded">
          <p className="whitespace-pre-wrap leading-relaxed">{detail.usedDescription}</p>
        </div>
        <div className="mt-6">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">목록</button>
        </div>
      </div>
    </div>
  );
}