export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* 고객센터 */}
        <div>
          <h2 className="font-bold">고객센터</h2>
          <p>전화: 1588-1234</p>
          <p>이메일: power4206@gmail.com</p>
          <p>운영시간: 평일 09:00 - 18:00</p>
        </div>

        {/* 회사 정보 */}
        <div>
          <h2 className="font-bold">회사정보</h2>
          <p>이용약관</p>
          <p>개인정보처리방침</p>
          <p>사이트맵</p>
        </div>

        {/* SNS */}
        <div className="flex flex-col space-y-2">
          <span className="font-bold">SNS</span>
          <a href="https://github.com/KHY90" className="text-gray-600">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
