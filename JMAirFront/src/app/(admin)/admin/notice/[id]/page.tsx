"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface NoticeDetail {
  id: number;
  title: string;
  writer: string;
  content: string;
  postTime: string;
  editTime: string;
}

export default function AdminNoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = Number(params.id);

  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices/${noticeId}`,
          { withCredentials: true }
        );
        setNotice(response.data);
      } catch (err) {
        console.error("공지사항 상세 조회 오류:", err);
        setError("공지사항을 불러오는데 실패했습니다.");
      }
    };

    fetchNotice();
  }, [noticeId]);

  const handleBack = () => {
    router.push("/admin/notice");
  };

  const handleEdit = () => {
    router.push(`/admin/notice/${noticeId}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices/${noticeId}/delete`,
        { withCredentials: true }
      );
      alert(`공지사항 ${noticeId} 삭제 완료`);
      router.push("/admin/notice");
    } catch (err) {
      console.error("공지사항 삭제 오류:", err);
      alert("공지사항 삭제에 실패했습니다.");
    }
  };

  if (error) {
    return <div className="font-gowun text-black p-4">{error}</div>;
  }

  if (!notice) {
    return <div className="font-gowun text-black p-4">로딩중...</div>;
  }

  return (
    <div className="font-gowun text-black min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {/* 제목 영역 */}
        <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>

        {/* 작성자, 등록일/수정일 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-grayDark text-sm border-b border-gray-200 pb-2 mb-4">
          <div>
            <span className="mr-4">작성자: {notice.writer}</span>
          </div>
          <div className="mt-2 sm:mt-0 flex space-x-4">
            <span>등록일: {notice.postTime}</span>
            {notice.editTime && <span>수정일: {notice.editTime}</span>}
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="min-h-[50vh] w-full break-words whitespace-normal text-base leading-relaxed mb-6">
          {notice.content}
        </div>

        {/* 버튼 영역 */}
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            목록
          </button>
          <div className="space-x-2">
            <button
              onClick={handleEdit}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
