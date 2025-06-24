"use client";
import { useEffect } from "react";
import axios from "axios";
import authStore from "./authStore";

export function useKakaoAuthUpdate() {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/kakao/current`,
          { withCredentials: true }
        );
        console.log("현재 사용자 조회 결과 (카카오):", response.data);
        if (response.data && response.data.user) {
          authStore.setUser(response.data.user);
        } else {
          console.log("사용자 정보가 없으므로 로그아웃 처리");
          authStore.logout();
        }
      } catch (error) {
        console.error("현재 사용자 조회 오류 (카카오):", error);
        authStore.logout();
      }
    };
    fetchCurrentUser();
  }, []);
}
