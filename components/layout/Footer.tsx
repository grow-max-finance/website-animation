import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaTelegram, FaMedium } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-[#020204] h-[212px] w-full">
      <div className="w-full h-full flex flex-col justify-between py-6">
        {/* Main footer */}
        <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Image
            src="/footer/footer.svg"
            alt="Growmax"
            width={150}
            height={34}
          />

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://x.com/GrowmaxFinance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-colors"
              aria-label="Twitter/X"
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://t.me/GrowmaxFinanceofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-colors"
              aria-label="Telegram"
            >
              <FaTelegram className="w-4 h-4" />
            </Link>
            <Link
              href="https://medium.com/@GrowmaxFinance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-colors"
              aria-label="Medium"
            >
              <FaMedium className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full">
          <div className="border-t border-gray-800 w-full"></div>
          <div className="px-6 md:px-12 lg:px-20 pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 Growmax. All rights reserved.
              </p>
              <div className="flex items-center gap-8">
                <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
