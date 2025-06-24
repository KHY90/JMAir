"use client";
import { useAuthUpdate } from "@/utils/useAuth";

export default function AuthUpdater() {
  useAuthUpdate();
  return null;
}
