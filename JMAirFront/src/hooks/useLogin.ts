import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import authStore from "@/utils/authStore";

export function useLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ userLogin: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userLogin || !formData.password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      // 로그인 요청
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );
      const data = response.data;
      if (data.user) {
        authStore.setUser(data.user);
      }

      alert("로그인 성공!");
      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return { formData, errorMessage, handleChange, handleSubmit };
}
