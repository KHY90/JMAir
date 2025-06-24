import { makeAutoObservable } from "mobx";

class AuthStore {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  isAuthenticated: boolean = false;
  user: { userLogin: string; userName: string; userGrade: string; } | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  // 로그인한 사용자 정보 저장
  setUser(user: { userLogin: string; userName: string; userGrade: string; } | null) {
    this.user = user;
    this.isAuthenticated = user !== null;
  }

  // 토큰 저장 (로그인 시)
  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.isAuthenticated = true;
  }

  // 쿠키에서 토큰 가져오기 (클라이언트 사이드에서만 호출)
  loadTokens() {
    if (typeof document === "undefined") return;
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
      }
      return null;
    };

    const access = getCookie("access_token");
    const refresh = getCookie("refresh_token");

    if (access) {
      this.accessToken = access;
      this.isAuthenticated = true;
    }
    if (refresh) {
      this.refreshToken = refresh;
    }
  }

  // 로그아웃
  logout() {
    if (typeof document !== "undefined") {
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }
    this.accessToken = null;
    this.refreshToken = null;
    this.isAuthenticated = false;
    this.user = null;
  }
}

const authStore = new AuthStore();
export default authStore;
