"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function KakaoLoginButton() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoUri = process.env.NEXT_PUBLIC_KAKAO_URI;

  const [oauthState, setOauthState] = useState("default_state");

  useEffect(() => {
    const generatedState = crypto.randomUUID();
    setOauthState(generatedState);

    document.cookie = `kakao_oauth_state=${generatedState}; path=/;`;
  }, []);

  const handleKakaoLogin = () => {
    const authUrl = `${kakaoUri}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${oauthState}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-1/2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 flex items-center justify-center h-12 relative overflow-hidden"
    >
      <Image
        src="/images/login/kakao_login_large_narrow.png"
        alt="Kakao"
        fill
        className="object-cover"
      />
    </button>
  );
}
