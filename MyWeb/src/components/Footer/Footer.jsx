export function Footer() {
  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start text-center md:text-left px-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white self-center">
            📞
          </div>
          <h3 className="font-bold mt-3">Подзвонити нам:</h3>
          <p>+380 (93) 8767 8798</p>
          <p>+380 (96) 7824 8121</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white self-center">
            📧
          </div>
          <h3 className="font-bold mt-3">Написати нам:</h3>
          <p>misecruasan@gmail.com</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white self-center">
            📍
          </div>
          <h3 className="font-bold mt-3">Де ми знаходимось:</h3>
          <p>55555 Sydney Fd Southern,</p>
          <p>Ukraine(UA), 55555</p>
        </div>
      </div>

      <div className="border-t border-white mt-6 pt-4 text-center text-sm">
        © Copy Right 2025 Shigatsu
      </div>
    </>
  );
}
