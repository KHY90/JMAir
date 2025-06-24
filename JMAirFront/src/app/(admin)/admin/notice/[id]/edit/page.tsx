"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  writer: string;
  postTime: string;
}

export default function AdminNoticeEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const noticeId = Number(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get<NoticeDetail>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices/${noticeId}`,
          { withCredentials: true }
        );
        console.log("공지사항 상세 조회 결과:", response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        console.error("공지사항 상세 조회 오류:", err);
        setError("공지사항을 불러오는데 실패했습니다.");
      }
    };

    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedNotice = { title, content };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices/${noticeId}/edit`,
        updatedNotice,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      console.log("수정 응답:", response.data);
      alert("공지사항 수정이 완료되었습니다!");
      router.push(`/admin/notice/${noticeId}`);
    } catch (err) {
      console.error("공지사항 수정 오류:", err);
      setError("공지사항 수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      router.back();
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 font-gowun text-black">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-gowun text-black">
      <h1 className="text-2xl font-bold mb-6">공지사항 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label className="block font-bold text-xl mb-2">제목</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="공지사항 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-bold text-xl mb-2">내용</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-3 min-h-[50vh] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="공지사항 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            수정 완료
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-6 py-3 rounded hover:bg-danger"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
