import { useState } from "react";

export default function useImageModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = (imagesLength: number) => {
    setModalIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const handleNext = (imagesLength: number) => {
    setModalIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  return { isModalOpen, modalIndex, openModal, closeModal, handlePrev, handleNext };
}
