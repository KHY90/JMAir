"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function AdminNoticeCreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices/post`,
        { title, content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      alert("공지사항 등록이 완료되었습니다!");
      router.push("/admin/notice");
    } catch (error) {
      console.error("공지사항 등록 오류:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("등록을 취소하시겠습니까?");
    if (confirmCancel) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-6">공지사항 등록</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl border border-gray-300 rounded-md p-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">제목</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="공지사항 제목 (최대 20자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">내용</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 h-40"
            placeholder="공지사항 내용을 입력하세요 (최대 3000자)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={3000}
            required
          />
        </div>

        <div className="flex space-x-2 justify-center">
          <button
            type="submit"
            className="w-[70%] bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-[30%] bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-danger"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
