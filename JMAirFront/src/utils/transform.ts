export function getInstallStatusText(status: string): string {
  switch (status) {
    case "REQUEST":
      return "예약 대기";
    case "CANCEL":
      return "예약 취소";
    case "RESERVATION":
      return "예약 확정";
    case "COMPLETION":
      return "설치 완료";
    case "FALLSE":
      return "신청 취소";
    default:
      return status;
  }
}

export function getUserGradeText(grade: string): string {
  return grade === "NOUSER" ? "비회원" : "회원";
}

export function getGradeText(grade: string): string {
  switch (grade) {
    case "SUPERADMIN":
      return "전체 관리자";
    case "ADMIN":
      return "웹 관리자";
    case "ADMINWATCHER":
      return "임시 관리자";
    case "ENGINEER":
      return "설치 기사";
    case "USER":
      return "회원";
    case "NOUSER":
      return "비회원";
    default:
      return "알 수 없음";
  }
}


export function getUsedStateText(state: string): string {
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
}