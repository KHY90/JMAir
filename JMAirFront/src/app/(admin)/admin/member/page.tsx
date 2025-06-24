"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SortBar from "@/components/SortBar";
import Pagination from "@/components/Pagination";
import MemberSearchBar from "@/components/MemberSearchBar";
import { MemberFilterBar } from "@/components/MemberFilterBar";
import { getGradeText } from "@/utils/transform";

interface Member {
  userLogin: string;
  userName: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  userGrade: string;
  status: boolean;
}

export default function MemberListPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get<Member[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/all`, {
          withCredentials: true,
        });
        setMembers(res.data);
      } catch (err) {
        console.error("회원 목록 조회 오류:", err);
        setError("회원 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    let filtered = [...members];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((m) =>
        [m.userLogin, m.userName, m.email, m.phoneNumber, m.userGrade, new Date(m.joinDate).toLocaleDateString("ko-KR")]
          .filter(Boolean)
          .some((field) => field?.toLowerCase().includes(term))
      );
    }

    if (gradeFilter) {
      filtered = filtered.filter((m) => m.userGrade === gradeFilter);
    }

    if (statusFilter) {
      const isActive = statusFilter === "true";
      filtered = filtered.filter((m) => m.status === isActive);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.joinDate).getTime();
      const dateB = new Date(b.joinDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [members, searchTerm, gradeFilter, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const displayedMembers = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredMembers, currentPage]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white">로딩 중...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 font-gowun">
      <h1 className="text-3xl font-bold mb-6 text-center">회원 관리</h1>

      {/* 검색, 필터, 정렬 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex w-full md:w-1/3 gap-2">
          <MemberSearchBar value={inputTerm} onChange={setInputTerm} className="w-full" />
          <button
            onClick={() => setSearchTerm(inputTerm)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>
        <MemberFilterBar
          grade={gradeFilter}
          status={statusFilter}
          onGradeChange={setGradeFilter}
          onStatusChange={setStatusFilter}
          className="w-full md:w-2/3"
        />
        <SortBar onSort={setSortOrder} className="w-full md:w-1/4" />
      </div>

      {/* 회원 목록 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 text-center">순번</th>
              <th className="py-2 px-4 text-center">아이디</th>
              <th className="py-2 px-4 text-center">이름</th>
              <th className="py-2 px-4 text-center">전화번호</th>
              <th className="py-2 px-4 text-center">가입일</th>
              <th className="py-2 px-4 text-center">회원 등급</th>
              <th className="py-2 px-4 text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {displayedMembers.length > 0 ? (
              displayedMembers.map((member, idx) => (
                <tr
                  key={member.userLogin}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/member/${member.userLogin}`)}
                >
                  <td className="py-2 px-4 text-center">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="py-2 px-4 text-center">{member.userLogin}</td>
                  <td className="py-2 px-4 text-center">{member.userName}</td>
                  <td className="py-2 px-4 text-center">{member.phoneNumber}</td>
                  <td className="py-2 px-4 text-center">{new Date(member.joinDate).toLocaleDateString("ko-KR")}</td>
                  <td className="py-2 px-4 text-center">{getGradeText(member.userGrade)}</td>
                  <td className="py-2 px-4 text-center">{member.status ? "활성" : "비활성"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">조회된 회원이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 영역 */}
      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page: number) => setCurrentPage(page)} />
      </div>
    </div>
  );
}
