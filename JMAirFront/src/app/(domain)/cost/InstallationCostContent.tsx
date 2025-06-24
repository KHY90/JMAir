"use client";
import React from "react";

export default function InstallationCostContent() {
  return (
    <main className="flex-1 p-6">
      {/* 벽걸이형 */}
      <section id="wall-type" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">벽걸이형 7평 이하 에어컨</h3>
        <div className="bg-white rounded shadow p-4 border border-gray-200">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>기본 설치비(5만원) 포함 (배관 5m 이내)</li>
            <li>실외기 거치대(앵글) 별도 : 15만원부터</li>
            <li>배관 추가 시 1m 당 추가 비용 : 2만 5천원 / 3만 5천원</li>
            <li>기타 비용은 현장 상황에 따라 달라질 수 있음</li>
          </ul>
        </div>
      </section>

      {/* 스탠드형 */}
      <section id="stand-type" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">스탠드형 15평 이하 에어컨</h3>
        <div className="bg-white rounded shadow p-4 border border-gray-200">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>기본 설치비 포함 (배관 5m 이내)</li>
            <li>실외기 거치대(앵글) 별도</li>
            <li>천장형 배관 공사 시 추가 비용</li>
            <li>기타 비용은 현장 상황에 따라 달라질 수 있음</li>
          </ul>
        </div>
      </section>

      {/* 시스템에어컨 */}
      <section id="system-type" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">시스템에어컨</h3>
        <div className="bg-white rounded shadow p-4 border border-gray-200">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>천장 매립형 설치 필요</li>
            <li>배관 공사, 전기 공사 별도</li>
            <li>실외기 및 덕트 공사 시 비용 협의</li>
            <li>상업용, 대형 매장 등은 사전 현장실사 필수</li>
          </ul>
        </div>
      </section>

      {/* 냉난방기 */}
      <section id="coolheat-type" className="mb-8">
        <h3 className="text-xl font-semibold mb-2">냉난방기</h3>
        <div className="bg-white rounded shadow p-4 border border-gray-200">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>기본 설치비 (배관 5m 이내) 포함</li>
            <li>냉난방 겸용 모델은 배수 공사 추가 비용</li>
            <li>실외기 위치, 배관 길이에 따라 추가 비용 발생</li>
            <li>현장 상황에 따라 별도 견적 필요</li>
          </ul>
        </div>
      </section>

      {/* 추가 안내사항 */}
      <section className="mt-12">
        <h4 className="text-lg font-bold mb-2">추가 안내사항</h4>
        <div className="bg-white rounded shadow p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            상기 설치 비용은 기본적인 기준이며, 실제 설치 환경(배관 길이, 실외기 위치,
            전기 공사 필요 여부 등)에 따라 달라질 수 있습니다.
            자세한 견적은 전화 문의 또는 방문 상담을 통해 확인해주세요.
          </p>
        </div>
      </section>
    </main>
  );
}
