"use client";
import { useState } from "react";

interface NoticeSearchBarProps {
  onSearch: (field: "title" | "writer", searchTerm: string) => void;
}

export default function NoticeSearchBar({ onSearch }: NoticeSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<"title" | "writer">("title");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "title" | "writer";
    setSearchField(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchField, searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
      <select
        value={searchField}
        onChange={handleSelectChange}
        className="border border-gray-300 rounded px-2 py-2 text-black"
      >
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </select>
      <input
        type="text"
        placeholder={searchField === "title" ? "제목 검색" : "작성자 검색"}
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-2 text-black flex-1"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        검색
      </button>
    </form>
  );
}
