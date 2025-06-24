"use client";
import React from "react";

export default function AdminPage() {
  // 임시 데이터
  const estimateData = [
    { id: 1, date: "2024-02-20", title: "가정집 에어컨 이전 설치 문의", status: "대기" },
    { id: 2, date: "2024-02-18", title: "사무실 에어컨 설치", status: "완료" },
  ];

  const memberData = [
    { id: 1, userName: "홍길동", email: "hong@example.com", joined: "2024-01-15" },
    { id: 2, userName: "김철수", email: "chul@example.com", joined: "2024-02-10" },
  ];

  const noticeData = [
    { id: 1, title: "공지사항 테스트", date: "2024-02-10", views: 120 },
    { id: 2, title: "새로운 이벤트 안내", date: "2024-02-09", views: 45 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>

        {/* 상단 카드 영역 (2열 그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 견적 신청 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">견적 신청 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">날짜</th>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-20">상태</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {estimateData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-sm">{item.date}</td>
                      <td className="py-2 px-2 text-sm">{item.title}</td>
                      <td className="py-2 px-2 text-sm">{item.status}</td>
                      <td className="py-2 px-2">
                        <button className="text-blue-500 mr-2">수정</button>
                        <button className="text-red-500">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 회원 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">회원 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2 w-32">회원명</th>
                    <th className="py-2 px-2">이메일</th>
                    <th className="py-2 px-2 w-32">가입일</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-sm">{item.userName}</td>
                      <td className="py-2 px-2 text-sm">{item.email}</td>
                      <td className="py-2 px-2 text-sm">{item.joined}</td>
                      <td className="py-2 px-2">
                        <button className="text-blue-500 mr-2">수정</button>
                        <button className="text-red-500">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 공지사항 관리 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">공지사항 관리</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-2">제목</th>
                    <th className="py-2 px-2 w-32">작성일</th>
                    <th className="py-2 px-2 w-20">조회수</th>
                    <th className="py-2 px-2 w-24">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeData.map((notice) => (
                    <tr key={notice.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-sm">{notice.title}</td>
                      <td className="py-2 px-2 text-sm">{notice.date}</td>
                      <td className="py-2 px-2 text-sm">{notice.views}</td>
                      <td className="py-2 px-2">
                        <button className="text-blue-500 mr-2">수정</button>
                        <button className="text-red-500">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-3">통계</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="border rounded p-2">
                <p className="text-sm text-gray-500">견적신청 수</p>
                <p className="text-xl font-bold">127명</p>
              </div>
              <div className="border rounded p-2">
                <p className="text-sm text-gray-500">공지사항 수</p>
                <p className="text-xl font-bold">45건</p>
              </div>
              <div className="border rounded p-2">
                <p className="text-sm text-gray-500">회원 수</p>
                <p className="text-xl font-bold">128명</p>
              </div>
              <div className="border rounded p-2">
                <p className="text-sm text-gray-500">기타</p>
                <p className="text-xl font-bold">12명</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
