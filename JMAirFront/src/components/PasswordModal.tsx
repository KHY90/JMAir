"use client";
import React, { useState } from "react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

export default function PasswordModal({ isOpen, onClose, onSubmit }: PasswordModalProps) {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded shadow-lg p-6 z-10 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">비밀번호 입력</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
