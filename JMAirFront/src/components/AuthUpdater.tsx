"use client";
import "@/utils/axiosConfig";
import { useAuthUpdate } from "@/utils/useAuth";

export default function AuthUpdater() {
  useAuthUpdate();
  return null;
}
