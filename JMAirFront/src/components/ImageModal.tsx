"use client";
import React from "react";
import Image from "next/image";

interface ImageModalProps {
  images: string[];
  modalIndex: number;
  handlePrev: (imagesLength: number) => void;
  handleNext: (imagesLength: number) => void;
  closeModal: () => void;
}

export default function ImageModal({
  images,
  modalIndex,
  handlePrev,
  handleNext,
  closeModal,
}: ImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-3xl"
      >
        ×
      </button>
      <button
        onClick={() => handlePrev(images.length)}
        className="absolute left-4 text-white text-3xl"
      >
        &lt;
      </button>
      <div className="relative w-[90%] max-w-4xl h-[80%]">
        <Image
          src={images[modalIndex]}
          alt={`확대 이미지 ${modalIndex + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>
      <button
        onClick={() => handleNext(images.length)}
        className="absolute right-4 text-white text-3xl"
      >
        &gt;
      </button>
    </div>
  );
}
