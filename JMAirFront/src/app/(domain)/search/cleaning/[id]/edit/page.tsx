"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function CleaningEditPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    cleanName: "",
    cleanNumber: "",
    cleanEmail: "",
    productType: "",
    cleanDescription: "",
    cleanAdress: "",
    cleanDetailAdress: "",
    cleanFirstReservationTime: "",
    cleanSecondReservationTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const password = searchParams.get("password");
      if (!id || !password) {
        setError("잘못된 접근입니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/${id}`,
          {
            params: { password },
            withCredentials: true,
          }
        );
        setForm(res.data);
      } catch {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = searchParams.get("password");
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clean/user/${id}/edit`,
        form,
        {
          params: { password },
          withCredentials: true,
        }
      );
      alert("수정이 완료되었습니다.");
      router.push(`/search/cleaning/${id}?password=${encodeURIComponent(password || "")}`);
    } catch (err) {
      console.error(err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p className="p-4">로딩 중...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 font-gowun">
      <h1 className="text-2xl font-bold mb-6">세척 신청 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="cleanName"
          value={form.cleanName}
          onChange={handleChange}
          placeholder="이름"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="cleanNumber"
          value={form.cleanNumber}
          onChange={handleChange}
          placeholder="연락처"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="cleanEmail"
          value={form.cleanEmail}
          onChange={handleChange}
          placeholder="이메일"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          name="productType"
          value={form.productType}
          onChange={handleChange}
          placeholder="제품 종류"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="cleanDescription"
          value={form.cleanDescription}
          onChange={handleChange}
          placeholder="요청 사항"
          className="w-full border rounded px-3 py-2 h-24"
        />
        <input
          name="cleanAdress"
          value={form.cleanAdress}
          onChange={handleChange}
          placeholder="주소"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="cleanDetailAdress"
          value={form.cleanDetailAdress}
          onChange={handleChange}
          placeholder="상세 주소"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="cleanFirstReservationTime"
          value={form.cleanFirstReservationTime}
          onChange={handleChange}
          placeholder="1차 희망일 (YYYY-MM-DDTHH:mm)"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="cleanSecondReservationTime"
          value={form.cleanSecondReservationTime}
          onChange={handleChange}
          placeholder="2차 희망일 (YYYY-MM-DDTHH:mm)"
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
            수정 완료
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-300 px-4 py-2 rounded">
            취소
          </button>
        </div>
      </form>
    </div>
  );
}