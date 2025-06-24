import { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
export const metadata: Metadata = {
  title: "에러 페이지",
  description: "404 - 페이지를 찾을 수 없습니다.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
