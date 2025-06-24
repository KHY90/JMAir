import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import authStore from "@/utils/authStore";

// 회원탈퇴 훅스
export function useDeleteAccount() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?\n탈퇴 후 복구할 수 없습니다.");
    if (!confirmDelete) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/delete`,
        null,
        {
          params: { userLogin: authStore.user?.userLogin },
          withCredentials: true,
        }
      );

      alert("회원 탈퇴가 완료되었습니다.");

      // 로그아웃 처리
      authStore.logout();
      router.push("/");
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      setErrorMessage("회원 탈퇴에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAccount, errorMessage, isLoading };
}
