"use client";
import React from "react";

export default function Sidebar() {
  const menuItems = [
    { label: "벽걸이형", href: "#wall-type" },
    { label: "스탠드형", href: "#stand-type" },
    { label: "시스템에어컨", href: "#system-type" },
    { label: "냉난방기", href: "#coolheat-type" },
  ];

  return (
    <aside className="w-60 mt-2 bg-white border-r border-gray-300 p-6">
      <h2 className="text-xl font-bold mb-4">설치비용</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="block text-gray-700 hover:text-blue-600"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
