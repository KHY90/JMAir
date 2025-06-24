"use client";
import { useEffect } from "react";
import axios from "axios";
import authStore from "./authStore";

export function useAuthUpdate() {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/current`,
          { withCredentials: true }
        );
        if (response.data && response.data.user) {
          authStore.setUser(response.data.user);
        } else {
          console.log("사용자 정보가 없으므로 로그아웃 처리");
          authStore.logout();
        }
      } catch (error) {
        console.error("현재 사용자 조회 오류:", error);
        authStore.logout();
      }
    };
    fetchCurrentUser();
  }, []);
}
