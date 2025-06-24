"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getInstallStatusText } from "@/utils/transform";

interface CleaningDetailDTO {
  cleanId: number;
  cleanName?: string;
  cleanNumber?: string;
  cleanEmail?: string;
  productType?: string;
  cleanDescription?: string;
  cleanAdress?: string;
  cleanDetailAdress?: string;
  cleanStartTime?: string;
  cleanFirstReservationTime?: string;
  cleanSecondReservationTime?: string;
  cleanStatus?: string;
}

function formatDateTime(dateStr?: string): string {
  if (!dateStr) return "없음";
  const dt = new Date(dateStr);
  if (Number.isNaN(dt.getTime())) return "없음";
  return dt.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
}

export default function CleaningDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detailData, setDetailData] = useState<CleaningDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      const storedPassword = sessionStorage.getItem("password");
      if (!id || !storedPassword) {
        setError("잘못된 접근입니다. 비밀번호가 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/user/${id}`,
          { password: storedPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setDetailData(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError("비밀번호가 일치하지 않습니다.");
          } else if (err.response?.status === 404) {
            setError("해당 신청을 찾을 수 없습니다.");
          } else {
            setError("서버 오류가 발생했습니다.");
          }
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
        sessionStorage.removeItem("password");
      }
    };
    fetchDetail();
  }, [id]);

  const handleEdit = () => {
    router.push(`/search/cleaning/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 신청을 취소하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/${id}/delete`, {
        withCredentials: true,
      });
      alert("신청이 취소되었습니다.");
      router.push("/search");
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-red-500">{error}</div>;
  }

  if (!detailData) return null;

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 font-gowun">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">에어컨 세척 신청</h1>
          <div className="space-x-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              취소
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-md p-6 mb-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">신청자 정보</h2>
            <p><strong>이름:</strong> {detailData.cleanName || "없음"}</p>
            <p><strong>연락처:</strong> {detailData.cleanNumber || "없음"}</p>
            <p><strong>이메일:</strong> {detailData.cleanEmail || "없음"}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">제품 정보</h2>
            <p><strong>제품 종류:</strong> {detailData.productType || "없음"}</p>
            <p><strong>상세 요청사항:</strong> {detailData.cleanDescription || "없음"}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">방문 주소</h2>
            <p>{detailData.cleanAdress || "없음"}</p>
            <p>{detailData.cleanDetailAdress || "없음"}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">예약 정보</h2>
            <p><strong>1차 희망:</strong> {formatDateTime(detailData.cleanFirstReservationTime)}</p>
            <p><strong>2차 희망:</strong> {formatDateTime(detailData.cleanSecondReservationTime)}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">신청 일자</h2>
            <p>{formatDateTime(detailData.cleanStartTime)}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">진행 상태</h2>
            <p>{getInstallStatusText(detailData.cleanStatus || "")}</p>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          목록
        </button>
      </div>
    </div>
  );
}