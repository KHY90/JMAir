"use client";

import Script from "next/script";

export default function ChatbotEmbed() {
  return (
    <>
      <Script id="dify-chatbot-config" strategy="afterInteractive">
        {`
          window.difyChatbotConfig = {
            token: '5ExMPYDo0AwjrWMC'
          }
        `}
      </Script>
      <Script
        src="https://udify.app/embed.min.js"
        id="5ExMPYDo0AwjrWMC"
        strategy="afterInteractive"
      />
      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
        }
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
          z-index: 9999 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
          z-index: 9999 !important;
        }
      `}</style>
    </>
  );
}
