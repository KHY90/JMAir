import { useRouter } from "next/navigation";
import axios from "axios";
import authStore from "@/utils/authStore";

export default function usePurchaseRequest() {
  const router = useRouter();

  interface PurchasePayload {
    usedName: string;
    usedCost: string;
    productType: string;
    usedDescription: string;
    usedYear: string;
    usedTime: string;
    usedNote: string;
    usedState: string;
  }

  const sendPurchaseRequest = async (usedId: number, payload: PurchasePayload) => {
    if (!authStore.isAuthenticated || !authStore.user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${usedId}/sale`,
        payload,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("구매 요청이 성공하였습니다. 고객님의 연락처로 곧 연락드리겠습니다.");
      router.push("/used-ac");
    } catch (err) {
      console.error("구매 요청 오류:", err);
      alert("구매 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { sendPurchaseRequest };
}
