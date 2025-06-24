"use client";
import React from "react";

interface MemberFilterBarProps {
  grade: string;
  status: string;
  onGradeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  className?: string;
}

export function MemberFilterBar({ grade, status, onGradeChange, onStatusChange, className = "" }: MemberFilterBarProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-2 ${className}`}>
      <select
        value={grade}
        onChange={(e) => onGradeChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">전체 등급</option>
        <option value="USER">일반회원</option>
        <option value="ENGINEER">설기사</option>
        <option value="ADMIN">관리자</option>
        <option value="SUPERADMIN">최고관리자</option>
        <option value="ADMINWATCHER">임시관리자</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">전체 상태</option>
        <option value="true">활성</option>
        <option value="false">비활성</option>
      </select>
    </div>
  );
}