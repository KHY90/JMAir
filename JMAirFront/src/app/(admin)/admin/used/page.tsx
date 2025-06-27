"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SortBar from "@/components/SortBar";
import Pagination from "@/components/Pagination";
import MemberSearchBar from "@/components/MemberSearchBar";
import { getUsedStateText } from "@/utils/transform";

interface UsedItem {
  id: number;
  title: string;
  price: number;
  state: string;
  postTime: string;
}

export default function AdminUsedListPage() {
  const router = useRouter();
  const [items, setItems] = useState<UsedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used`,
          { withCredentials: true }
        );
        interface UsedResponse {
          usedId: number;
          usedName: string;
          usedCost: number;
          usedState: string;
          usedPostTime: string;
        }
        const mapped: UsedItem[] = res.data.map((item: UsedResponse) => ({
          id: item.usedId,
          title: item.usedName,
          price: item.usedCost,
          state: item.usedState,
          postTime: item.usedPostTime,
        }));
        setItems(mapped);
      } catch (err) {
        console.error("중고 에어컨 목록 조회 오류:", err);
        setError("중고 에어컨 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const dateA = new Date(a.postTime).getTime();
        const dateB = new Date(b.postTime).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }),
    [filtered, sortOrder]
  );

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const displayed = useMemo(
    () =>
      sorted.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      ),
    [sorted, currentPage]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        로딩중...
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
    <div className="bg-white text-black min-h-screen flex flex-col font-gowun">
      <div className="container mx-auto py-8 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">중고 에어컨 관리</h1>
        <button
          onClick={() => router.push("/admin/used/post")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          등록
        </button>
      </div>
      <div className="container mx-auto px-4 mb-2 flex justify-end">
        <SortBar onSort={setSortOrder} />
      </div>
      <div className="container mx-auto px-4 flex-1">
        <div className="overflow-x-auto w-full border border-gray-300 rounded-md">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 w-16">번호</th>
                <th className="py-3 px-4">제목</th>
                <th className="py-3 px-4 w-24 text-right">가격</th>
                <th className="py-3 px-4 w-32 text-center">상태</th>
                <th className="py-3 px-4 w-32 text-center">등록일</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/used/${item.id}`)}
                >
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4 text-right">
                    {item.price.toLocaleString()}원
                  </td>
                  <td className="py-3 px-4 text-center">
                    {getUsedStateText(item.state)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {new Date(item.postTime).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 px-4 text-center text-gray-400">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="container mx-auto px-4 mt-4 flex w-full md:w-1/3 gap-2">
          <MemberSearchBar value={inputTerm} onChange={setInputTerm} className="w-full" />
          <button
            onClick={() => { setSearchTerm(inputTerm); setCurrentPage(1); }}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>
        <div className="container mx-auto px-4 mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}