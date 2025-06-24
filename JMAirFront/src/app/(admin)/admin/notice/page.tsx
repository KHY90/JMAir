"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NoticeSearchBar from "../../../../components/NoticeSearchBar";
import SortBar from "../../../../components/SortBar";
import Pagination from "../../../../components/Pagination";
import { NoticeItem, useNotice } from "../../../../hooks/useNotice";

export default function AdminNoticeListPage() {
  const router = useRouter();
  const [data, setData] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notices`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("공지사항 조회 오류:", error);
      }
    };
    fetchNotices();
  }, []);


  const itemsPerPage = 10;
  const { displayedData, totalPages, currentPage, setSearch, setPage, setSortOrder } = useNotice(data, itemsPerPage);

  // 검색 콜백
  const handleSearch = (field: "title" | "writer", term: string) => {
    setSearch(field, term);
  };

  // 정렬 콜백
  const handleSort = (order: "desc" | "asc") => {
    setSortOrder(order);
  };

  // 페이지 변경 콜백
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleTitleClick = (id: number) => {
    router.push(`/admin/notice/${id}`);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 상단 영역 */}
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">공지사항 목록</h1>
        <button
          onClick={() => router.push("/admin/notice/post")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          등록
        </button>
      </div>


      {/* 정렬 박스 */}
      <div className="container mx-auto px-4 mb-2 flex justify-end">
        <SortBar onSort={handleSort} />
      </div>

      {/* 테이블 영역 */}
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-grayDark rounded-md">
          <table className="w-full text-left">
            <thead className="bg-grayDark/50">
              <tr>
                <th className="py-3 px-4 w-16">번호</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32 text-center">작성자</th>
                <th className="py-3 px-4 w-32 text-center">작성일</th>
                <th className="py-3 px-4 w-24 text-center">조회수</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((notice, idx) => (
                <tr
                  key={notice.id}
                  className="border-b border-grayDark hover:bg-grayDark/40"
                >
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td
                    className="py-3 px-4 cursor-pointer text-black"
                    onClick={() => handleTitleClick(notice.id)}
                  >
                    {notice.title}
                  </td>
                  <td className="py-3 px-4 text-center">{notice.writer}</td>
                  <td className="py-3 px-4 text-center">
                    {new Date(notice.postTime).toLocaleDateString("ko-KR")}
                  </td>
                  {/* <td className="py-3 px-4 text-center">{notice.viewCount}</td> */}
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 검색창 */}
        <div className="container mx-auto px-4 mt-4 flex justify-center">
          <NoticeSearchBar onSearch={handleSearch} />
        </div>

        {/* 페이지네이션 영역 */}
        <div className="container mx-auto px-4 mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
