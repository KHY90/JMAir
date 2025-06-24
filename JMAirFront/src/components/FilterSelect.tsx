"use client";
import React from "react";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterSelect({
  value,
  onChange,
  className = "",
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      <option value="">전체</option>
      <option value="REQUEST">예약 대기</option>
      <option value="CANCEL">예약 취소</option>
      <option value="RESERVATION">예약 확정</option>
      <option value="COMPLETION">설치 완료</option>
      <option value="FALLSE">신청 취소</option>
    </select>
  );
}
