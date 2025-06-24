"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getInstallStatusText } from "@/utils/transform";
import PasswordModal from "@/components/PasswordModal";

interface ResponseApplicationData {
  installId?: number;
  cleanId?: number;
  asId?: number;
  requestDate?: string;
  asStartTime?: string;
  cleanStartTime?: string;
  asStatus?: string;
  cleanStatus?: string;
  installStatus?: string;
  status: string;
}

interface ApplicationItem {
  id: number;
  requestDate: string;
  status: string;
  type: "견적" | "세척" | "A/S";
}

export default function ApplicationHistoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApplicationItem | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const results = await Promise.allSettled([
        axios.get<ResponseApplicationData[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/install`, {
          params: { name: name.trim(), phone: phone.trim() },
          withCredentials: true,
        }),
        axios.get<ResponseApplicationData[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean`, {
          params: { name: name.trim(), phone: phone.trim() },
          withCredentials: true,
        }),
        axios.get<ResponseApplicationData[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service`, {
          params: { name: name.trim(), phone: phone.trim() },
          withCredentials: true,
        }),
      ]);

      const installApps = results[0].status === "fulfilled"
        ? results[0].value.data.map((item) => ({
            id: item.installId || 0,
            type: "견적" as const,
            requestDate: item.requestDate || "",
            status: item.installStatus || "",
          }))
        : [];
      const cleaningApps = results[1].status === "fulfilled"
        ? results[1].value.data.map((item) => ({
            id: item.cleanId || 0,
            type: "세척" as const,
            requestDate: item.cleanStartTime || "",
            status: item.cleanStatus || "",
          }))
        : [];
      const asApps = results[2].status === "fulfilled"
        ? results[2].value.data.map((item) => ({
            id: item.asId || 0,
            type: "A/S" as const,
            requestDate: item.asStartTime || "",
            status: item.asStatus || "",
          }))
        : [];

      const allApps = [...installApps, ...cleaningApps, ...asApps];
      setApplications(allApps);
      
    } catch (err) {
      console.error(err);
      setError("신청 내역을 불러오는데 실패했습니다.");
    }
  };

  const handleItemClick = (item: ApplicationItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (selectedItem) {
      sessionStorage.setItem("password", password);
  
      let path = "";
      switch (selectedItem.type) {
        case "견적":
          path = `/search/install/${selectedItem.id}`;
          break;
        case "세척":
          path = `/search/cleaning/${selectedItem.id}`;
          break;
        case "A/S":
          path = `/search/service/${selectedItem.id}`;
          break;
      }
      setIsModalOpen(false);
      setSelectedItem(null);
      router.push(path);
    }
  };

  return (
    <div className="container mx-auto p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-4 text-center">신청 내역 조회</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded min-w-[320px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-center">번호</th>
              <th className="py-2 px-4 text-center">신청 종류</th>
              <th className="py-2 px-4 text-center">신청일</th>
              <th className="py-2 px-4 text-center">진행상태</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {applications.map((item, index) => {
              const formattedDate = item.requestDate
                ? new Date(item.requestDate).toLocaleDateString("ko-KR")
                : "";
              return (
                <tr
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleItemClick(item)}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">{formattedDate}</td>
                  <td className="py-2 px-4">{getInstallStatusText(item.status)}</td>
                </tr>
              );
            })}
            {applications.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4">
                  조회된 신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center md:justify-end">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="핸드폰 번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            조회
          </button>
        </form>
      </div>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      
      {/* 비밀번호 입력 팝업 */}
      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedItem(null); }} 
        onSubmit={handlePasswordSubmit} 
      />
    </div>
  );
}
