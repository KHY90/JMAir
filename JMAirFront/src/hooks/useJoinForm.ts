import { useState } from "react";
import { validateUserLogin, validatePassword, validateConfirmPassword, validateEmail, checkUserLoginExists } from "@/utils/validation";

export const useJoinForm = () => {
  // 입력 데이터 상태
  const [formData, setFormData] = useState({
    userLogin: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });

  // 에러 메시지 상태
  const [errors, setErrors] = useState({
    userLogin: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });

  const [isUserLoginChecked, setIsUserLoginChecked] = useState(false);

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력값 변경 시 즉시 검증
    let error = "";
    if (name === "userLogin") error = validateUserLogin(value) || "";
    if (name === "password") error = validatePassword(value) || "";
    if (name === "confirmPassword") error = validateConfirmPassword(formData.password, value) || "";
    if (name === "phoneNumber") {
      if (!value) {
        error = "전화번호는 필수입니다.";
      } else if (!/^\d+$/.test(value)) {
        error = "전화번호는 숫자만 입력할 수 있습니다.";
      } else if (value.length < 10) {
        error = "전화번호를 다시 확인해주세요.";
      } else {
        error = "";
      }
    }    if (name === "email") error = validateEmail(value) || "";

    setErrors((prev) => ({ ...prev, [name]: error }));

    // 아이디 입력값이 변경되면 중복 체크 다시 해야 함
    if (name === "userLogin") setIsUserLoginChecked(false);
  };

  // 아이디 중복 확인
  const handleCheckUserLogin = async () => {
    if (errors.userLogin) return; // 유효성 검사 실패 시 중복 체크 안 함
    const exists = await checkUserLoginExists(formData.userLogin);
    if (exists) {
      setErrors((prev) => ({ ...prev, userLogin: "이미 사용 중인 아이디입니다." }));
      setIsUserLoginChecked(false);
    } else {
      alert("사용 가능한 아이디입니다.");
      setIsUserLoginChecked(true);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isUserLoginChecked,
    setIsUserLoginChecked,
    handleChange,
    handleCheckUserLogin,
  };
};
