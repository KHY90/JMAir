import { useRouter } from "next/navigation";
import axios from "axios";
import authStore from "./authStore";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("로그아웃 요청 오류:", error);
    } finally {
      authStore.logout();
      router.push("/");
    }
  };

  return logout;
}
