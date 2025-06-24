"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

interface CustomDateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CustomDateTimePicker({ label, value, onChange }: CustomDateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onChange(selectedDate.toISOString());
    }
    setOpen(false);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={selectedDate ? selectedDate.toLocaleString("ko-KR") : ''}
        onClick={() => setOpen(true)}
        className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer"
        placeholder="날짜 및 시간을 선택하세요"
      />
      {open && (
        <div className="relative z-10">
          <DatePicker
            selected={selectedDate}
            onChange={handleSelect}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            locale={ko} 
            inline
          />
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-2 border border-gray-300 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200"
          >
            선택
          </button>
        </div>
      )}
    </div>
  );
}
