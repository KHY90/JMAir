"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import SortBar from "../../../../components/SortBar";
import { useEstimate } from "../../../../hooks/useEstimate";
import { useRouter } from "next/navigation";

export interface ASItem {
  id: number;         
  title: string;     
  applicant: string;  
  date: string;      
}

export default function AsListPage() {
  const router = useRouter();
  const [serverData, setServerData] = useState<ASItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  const { displayedData, totalPages, currentPage, setSearch, setPage, setSortOrder } = useEstimate(serverData, itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service`,
          { withCredentials: true }
        );

        interface ServiceItem {
          asId: number;
          asDescription?: string;
          asName: string;
          asStartTime?: string;
        }

        const mappedData: ASItem[] = response.data.map((item: ServiceItem) => ({
          id: item.asId,
          title: item.asDescription || "AS 신청",
          applicant: item.asName,
          date: item.asStartTime ? new Date(item.asStartTime).toLocaleDateString("ko-KR") : "",
        }));
        setServerData(mappedData);
      } catch (err) {
        console.error("AS 신청 목록 조회 오류:", err);
        setError("AS 신청 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 검색 콜백
  const handleSearch = (field: "title" | "applicant", term: string) => {
    setSearch(field, term);
  };

  // 페이지 변경 콜백
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // 정렬 콜백
  const handleSort = (order: "desc" | "asc") => {
    setSortOrder(order);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 상단 영역 */}
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AS 신청 관리</h1>
      </div>

      {/* 정렬 박스 */}
      <div className="container mx-auto px-4 mb-2 flex justify-end">
        <SortBar onSort={handleSort} />
      </div>

      {/* 테이블 영역 */}
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-gray-300 rounded-md">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 w-16">순서</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32">신청자</th>
                <th className="py-3 px-4 w-32">등록일</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/as/${item.id}`)}
                >
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4 text-center">{item.applicant}</td>
                  <td className="py-3 px-4 text-center">{item.date}</td>
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-3 px-4 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 검색창 */}
        <div className="container mx-auto px-4 mt-4 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 페이지네이션 영역 */}
        <div className="container mx-auto px-4 mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
