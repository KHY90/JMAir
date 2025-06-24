"use client";
import React from "react";

interface MemberSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function MemberSearchBar({ value, onChange, className = "" }: MemberSearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="아이디, 이름, 이메일, 전화번호 등 검색"
      className={`border border-gray-300 rounded px-3 py-2 text-black w-full focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}
