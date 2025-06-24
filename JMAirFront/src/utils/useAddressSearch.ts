import { useState } from "react";

interface PostcodeData {
  address: string;
}

interface DaumWindow {
  daum?: {
    Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => {
      open: () => void;
    };
  };
}

export function useAddressSearch() {
  const [address, setAddress] = useState("");

  const searchAddress = () => {
    // Window & DaumWindow
    const w = window as Window & DaumWindow;
    if (w.daum?.Postcode) {
      new w.daum.Postcode({
        oncomplete: (data) => setAddress(data.address),
      }).open();
    } else {
      alert("주소 검색 기능을 사용할 수 없습니다.");
    }
  };

  return { address, searchAddress, setAddress };
}
