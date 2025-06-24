"use client";
import React from "react";
import Sidebar from "./Sidebar";

export default function InstallationCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
