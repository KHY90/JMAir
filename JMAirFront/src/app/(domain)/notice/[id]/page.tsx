"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export interface NoticeDetail {
  id: number;
  title: string;
  writer: string;
  content: string;
  postTime: string;
  editTime?: string;
}

export default function NoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = Number(params.id);

  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [error, setError] = useState<string>("");

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
    router.push("/notice");
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
        <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>

        {/* 작성자 및 날짜 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-grayDark text-sm border-b border-gray-200 pb-2 mb-4">
          <div>
            <span className="mr-4">작성자: {notice.writer}</span>
          </div>
          <div className="mt-2 sm:mt-0">
            <span>작성일: {notice.postTime}</span>
            {notice.editTime && <span className="ml-4">수정일: {notice.editTime}</span>}
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="w-full break-words whitespace-normal text-base leading-relaxed mb-6 min-h-[50vh]">
          {notice.content}
        </div>

        {/* 버튼 영역 */}
        <div className="border-t border-gray-200 pt-4 flex justify-start">
          <button
            onClick={handleBack}
            className="bg-grayDark hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
}
