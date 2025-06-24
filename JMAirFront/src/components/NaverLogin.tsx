"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function NaverLoginButton() {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const naverUri = process.env.NEXT_PUBLIC_NAVER_URI;

  const [oauthState, setOauthState] = useState("default_state");

  useEffect(() => {
    const generatedState = crypto.randomUUID();
    setOauthState(generatedState);
    document.cookie = `oauth_state=${generatedState}; path=/;`;
  }, []);

  const handleNaverLogin = () => {
    const authUrl = `${naverUri}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${oauthState}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="w-1/2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center h-12 relative overflow-hidden"
    >
      <Image
        src="/images/login/naver_mi.png"
        alt="Naver"
        fill
        className="object-cover"
      />
    </button>
  );
}
