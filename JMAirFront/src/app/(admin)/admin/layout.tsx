"use client";
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import withAdminAuth from "@/hoc/withAdminAuth";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
        {children}
      </div>
    </div>
  );
}

export default withAdminAuth(AdminLayout);
