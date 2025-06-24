"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface InstallEditDTO {
  installId: number;
  installNote?: string;
  installStatus?: string;
}

const STATUS_OPTIONS = [
  { value: "REQUEST", label: "요청 대기" },
  { value: "RESERVATION", label: "예약 확정" },
  { value: "COMPLETION", label: "설치 완료" },
  { value: "CANCEL", label: "취소" },
];

export default function EstimateEditAdminPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [formData, setFormData] = useState<InstallEditDTO>({
    installId: Number(id),
    installNote: "",
    installStatus: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("잘못된 접근입니다.");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${id}`,
          { withCredentials: true }
        );
        const editData: InstallEditDTO = {
          installId: res.data.installId,
          installNote: res.data.installNote || "",
          installStatus: res.data.installStatus || "",
        };
        setFormData(editData);
      } catch (err) {
        console.error("수정 페이지 데이터 조회 오류:", err);
        setError("수정할 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("정말로 수정하시겠습니까?")) return;

    setLoading(true);
    setError("");

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install/${id}/admin/edit`,
        {
          installNote: formData.installNote,
          installStatus: formData.installStatus,
        },
        { withCredentials: true }
      );
      alert("수정이 완료되었습니다.");
      router.back();
    } catch (err) {
      console.error("수정 요청 오류:", err);
      setError("수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      router.back();
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

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 font-gowun">
      <div className="max-w-3xl mx-auto border border-gray-300 rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">견적 신청 수정</h1>
        <form onSubmit={handleSubmit}>
          {/* 상태 선택 */}
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="installStatus">
              상태
            </label>
            <select
              id="installStatus"
              name="installStatus"
              value={formData.installStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">-- 상태 선택 --</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 비고 */}
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="installNote">
              비고
            </label>
            <textarea
              id="installNote"
              name="installNote"
              value={formData.installNote}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              placeholder="담당 설치 기사, 관리자 메모, 작업 참고 사항 등을 입력"
            />
          </div>

          {/* 버튼 영역 */}
          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-400 text-black px-6 py-2 rounded hover:bg-red-500"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
