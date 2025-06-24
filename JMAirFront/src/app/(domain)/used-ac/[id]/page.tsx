"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import useImageModal from "@/hooks/useImageModal";
import ImageModal from "@/components/ImageModal";
import usePurchaseRequest from "@/hooks/usePurchaseRequest";

interface UsedDTO {
  usedId: number;
  usedName: string;
  usedCost: string;
  productType: string;
  usedDescription: string;
  usedYear: string;
  usedTime: string;
  usedPostTime: string;
  usedEditTime: string;
  usedEndTime: string;
  usedState: string;
  usedImages: string[];
  usedNote?: string;
}

const getUsedStateText = (state: string) => {
  switch (state) {
    case "SALE":
      return "판매중";
    case "RESERVATION":
      return "예약중";
    case "COMPLETION":
      return "판매완료";
    case "CANCEL":
      return "구매취소";
    case "FALLSE":
      return "판매취소";
    default:
      return state;
  }
};

export default function UsedAcDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState<UsedDTO | null>(null);
  const [error, setError] = useState("");

  const {
    isModalOpen,
    modalIndex,
    openModal,
    closeModal,
    handlePrev,
    handleNext,
  } = useImageModal();
  const { sendPurchaseRequest } = usePurchaseRequest();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/used/${id}`, { withCredentials: true })
      .then((response) => {
        setDetailData(response.data);
      })
      .catch((err) => {
        console.error("중고 에어컨 상세 조회 오류:", err);
        setError("중고 에어컨 상세 정보를 불러오는 중 오류가 발생했습니다.");
      });
  }, [id]);

  if (error) {
    return <div className="min-h-screen bg-white text-black p-6">{error}</div>;
  }
  if (!detailData) {
    return <div className="min-h-screen bg-white text-black p-6">로딩중...</div>;
  }

  const mainImage =
    detailData.usedImages && detailData.usedImages.length > 0
      ? detailData.usedImages[0]
      : null;

  const isPurchaseEnabled = detailData.usedState === "SALE";

  const handlePurchaseRequest = () => {
    const payload = {
      usedName: detailData.usedName,
      usedCost: detailData.usedCost,
      productType: detailData.productType,
      usedDescription: detailData.usedDescription,
      usedYear: detailData.usedYear,
      usedTime: detailData.usedTime,
      usedNote: detailData.usedNote || "",
      usedState: detailData.usedState || "RESERVATION",
    };

    sendPurchaseRequest(detailData.usedId, payload);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 font-gowun">
      <div className="max-w-5xl mx-auto">
        {/* 이미지 + 정보 영역 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 메인 이미지 영역 */}
          <div className="flex-1">
            {mainImage ? (
              <div
                className="relative w-full h-64 mb-4 cursor-pointer"
                onClick={() => openModal(0)}
              >
                <Image
                  src={mainImage}
                  alt="메인 이미지"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-500 text-sm">600 x 400</span>
              </div>
            )}

            {/* 썸네일 이미지 영역 */}
            {detailData.usedImages && detailData.usedImages.length > 1 && (
              <div className="flex gap-2">
                {detailData.usedImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={img}
                      alt={`썸네일 ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 제품 정보 영역 */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-10 text-justify">{detailData.usedName}</h1>
            <p className="text-3xl mb-4 mt-4">
              판매가격 : {Number(detailData.usedCost).toLocaleString()}원
            </p>
            <p className="text-grayDark mb-2">사용 기한 : {detailData.usedTime}</p>
            <p className="text-grayDark mb-2">제작 년도: {detailData.usedYear}</p>
            <p className="text-grayDark mb-2">제품 종류: {detailData.productType}</p>
            <p className="text-grayDark mb-2">
              판매 상태: {getUsedStateText(detailData.usedState)}
            </p>
            <p className="text-grayDark mb-6">
              등록일: {new Date(detailData.usedPostTime).toLocaleDateString("ko-KR")}
            </p>
            <button
              onClick={isPurchaseEnabled ? handlePurchaseRequest : undefined}
              disabled={!isPurchaseEnabled}
              className={`${
                isPurchaseEnabled
                  ? "bg-primary hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white px-6 py-3 rounded`}
            >
              구매 요청하기
            </button>
          </div>
        </div>

        {/* 상세 설명 영역 */}
        <div
          className="mt-8 bg-gray-50 p-4 border border-gray-200 rounded"
          style={{ minHeight: "30vh" }}
        >
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {detailData.usedDescription}
          </p>
        </div>
      </div>

      {/* 모달 이미지 뷰어 */}
      {isModalOpen && detailData.usedImages && (
        <ImageModal
          images={detailData.usedImages}
          modalIndex={modalIndex}
          handlePrev={(length) => handlePrev(length)}
          handleNext={(length) => handleNext(length)}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
