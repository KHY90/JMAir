"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getInstallStatusText, getUserGradeText } from "@/utils/transform";

interface InstallDTO {
  installId: number;
  installName?: string;
  installAddress?: string;
  installDetailAddress?: string;
  installPhone?: string;
  installEmail?: string;
  installDescription?: string;
  reservationFirstDate?: string;
  reservationSecondDate?: string;
  requestDate?: string;
  installStatus?: string;
  installNote?: string;
  registeredUserGrade?: string;
}

function formatDateTime(dateStr?: string): string {
  if (!dateStr) return "없음";
  const dt = new Date(dateStr);
  if (Number.isNaN(dt.getTime())) return "없음";
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${hours}시 ${String(minutes).padStart(2, "0")}분`;
}

export default function EstimateDetailAdminPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detailData, setDetailData] = useState<InstallDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("잘못된 접근입니다.");
      return;
    }
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${id}`,
          { withCredentials: true }
        );
        setDetailData(res.data);
      } catch (err) {
        console.error("견적 신청 상세 조회 오류:", err);
        setError("견적 신청 상세 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);


  const handleEdit = () => {
    router.push(`/admin/estimate/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${id}/delete`,
        { withCredentials: true }
      );
      alert("삭제되었습니다.");
      router.back();
    } catch (err) {
      console.error("삭제 요청 오류:", err);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
        {error}
      </div>
    );
  }

  if (!detailData) return null;

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 font-gowun">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {detailData.installDescription || "에어컨 설치 문의"}
            </h1>
            <p className="text-gray-500 mt-1">
              등록일자: {formatDateTime(detailData.requestDate)}
            </p>
          </div>

          <div className="mt-3 md:mt-0 space-x-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수락 및 수정
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>

        {/* 메인 내용 */}
        <div className="bg-white text-black p-6 rounded-md border border-gray-300">
          {/* 신청자 정보 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">신청자 정보</h2>
            <p className="leading-relaxed">
              <strong>이름:</strong> {detailData.installName?.trim() || "없음"}
            </p>
            <p className="leading-relaxed">
              <strong>전화번호:</strong> {detailData.installPhone?.trim() || "없음"}
            </p>
            <p className="leading-relaxed">
              <strong>이메일:</strong> {detailData.installEmail?.trim() || "없음"}
            </p>
          </div>

          {/* 설치 희망 주소 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">설치 희망 주소</h2>
            <p className="leading-relaxed">
              {detailData.installAddress?.trim() || "없음"}
            </p>
            <p className="leading-relaxed">
              {detailData.installDetailAddress?.trim() || "없음"}
            </p>
          </div>

          {/* 희망 설치일 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">희망 설치일</h2>
            <p className="mb-2">1차: {formatDateTime(detailData.reservationFirstDate)}</p>
            <p>2차: {formatDateTime(detailData.reservationSecondDate)}</p>
          </div>

          {/* 상태 및 비고 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">상태 및 기타</h2>
            <p>
              <strong>상태:</strong>{" "}
              {getInstallStatusText(detailData.installStatus || "")}
            </p>
            {detailData.registeredUserGrade && (
              <p>
                <strong>회원 여부:</strong>{" "}
                {getUserGradeText(detailData.registeredUserGrade|| "")}
              </p>
            )}
            <p>
              <strong>비고:</strong>{" "}
              {detailData.installNote?.trim() || "없음"}
            </p>
          </div>
        </div>

        {/* 목록으로 버튼 */}
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
}
