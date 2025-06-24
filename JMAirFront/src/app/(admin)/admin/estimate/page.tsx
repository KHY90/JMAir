"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import SortBar from "../../../../components/SortBar";
import FilterSelect from "../../../../components/FilterSelect";
import { useEstimate, EstimateItem } from "../../../../hooks/useEstimate";
import { useRouter } from "next/navigation";
import { getInstallStatusText, getUserGradeText } from "@/utils/transform";

export interface ASItemExtended extends EstimateItem {
  installStatus: string;
  registeredUserGrade: string;
}

export default function AsListPage() {
  const router = useRouter();
  const [serverData, setServerData] = useState<ASItemExtended[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const itemsPerPage = 10;

  const filteredData = serverData.filter((item) =>
    filterStatus === "" ? true : item.installStatus === filterStatus
  );

  const {
    displayedData,
    totalPages,
    currentPage,
    setSearch,
    setPage,
    setSortOrder,
  } = useEstimate(filteredData, itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install`,
          { withCredentials: true }
        );

        interface InstallItem {
          installId: number;
          installDescription: string;
          installName: string;
          requestDate: string;
          installStatus: string;
          registeredUserGrade: string;
        }

        const mappedData: ASItemExtended[] = response.data.map(
          (item: InstallItem) => ({
            id: item.installId,
            title: item.installDescription || "견적 신청 문의",
            applicant: item.installName,
            date: item.requestDate
              ? new Date(item.requestDate).toLocaleDateString("ko-KR")
              : "",
            installStatus: item.installStatus,
            registeredUserGrade: item.registeredUserGrade,
          })
        );

        setServerData(mappedData);
      } catch (err) {
        console.error("견적 신청 목록 조회 오류:", err);
        setError("견적 신청 목록을 불러오는 중 오류가 발생했습니다.");
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
      <div className="container mx-auto py-8 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-bold">견적 신청 관리</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* 필터 박스 */}
          <FilterSelect
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-36"
          />

          {/* 정렬 박스 */}
          <div className="flex items-center gap-2">
            <span>정렬:</span>
            <SortBar onSort={handleSort} className="w-36" />
          </div>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-gray-300 rounded-md">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="py-3 px-4 w-16">순서</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-32">신청자</th>
                <th className="py-3 px-4 w-32">등록일</th>
                <th className="py-3 px-4 w-32">상태</th>
                <th className="py-3 px-4 w-32">회원여부</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {displayedData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/estimate/${item.id}`)}
                >
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-3 px-4 text-blue-600 underline">
                    {item.title}
                  </td>
                  <td className="py-3 px-4">{item.applicant}</td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">
                    {getInstallStatusText(item.installStatus)}
                  </td>
                  <td className="py-3 px-4">
                    {getUserGradeText(item.registeredUserGrade)}
                  </td>
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-3 px-4 text-gray-400">
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
