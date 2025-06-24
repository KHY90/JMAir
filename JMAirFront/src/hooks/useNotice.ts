"use client";
import { useState, useMemo } from "react";

export interface NoticeItem {
  id: number;
  title: string;
  writer: string;
  postTime: string;
  editTime: string;
  deleteTime: string;
}

export type SearchField = "title" | "writer";
export type SortOrder = "desc" | "asc";

export function useNotice(data: NoticeItem[], itemsPerPage: number = 10) {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("title");

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 정렬 상태
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // 검색 적용
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      searchField === "title"
        ? item.title.includes(searchTerm)
        : item.writer.includes(searchTerm)
    );
  }, [data, searchField, searchTerm]);

// 정렬 (날짜 기준)
const sortedData = useMemo(() => {
  return [...filteredData].sort((a, b) => {
    return sortOrder === "desc"
      ? b.postTime.localeCompare(a.postTime)
      : a.postTime.localeCompare(b.postTime);
  });
}, [filteredData, sortOrder]);

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / itemsPerPage);
  }, [sortedData, itemsPerPage]);

  // 현재 페이지에 표시할 데이터
  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // 검색 업데이트
  const setSearch = (field: SearchField, term: string) => {
    setSearchField(field);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 페이지 변경
  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 정렬 변경
  const updateSortOrder = (order: SortOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return {
    displayedData,
    totalPages,
    currentPage,
    searchField,
    searchTerm,
    sortOrder,
    setSearch,
    setPage,
    setSortOrder: updateSortOrder,
  };
}
