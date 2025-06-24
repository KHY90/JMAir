"use client";
import { useDeleteAccount } from "@/hooks/useDeleteAcoount";

export default function MyPage() {
  const { deleteAccount, errorMessage, isLoading } = useDeleteAccount();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">마이페이지</h2>

      <button
        onClick={deleteAccount}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        disabled={isLoading}
      >
        {isLoading ? "탈퇴 중..." : "회원 탈퇴"}
      </button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
