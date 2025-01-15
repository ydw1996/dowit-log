'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="py-4 px-8 bg-gradient-to-r text-white">
            <div className="flex justify-between items-center mx-auto max-w-4xl">
                {/* 로고 */}
                <div className="text-xl">
                    <Link className="font-bold" href="/">
                        dowit-log.
                    </Link>
                </div>

                {/* 데스크탑 메뉴 */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/blog">Blog</Link>
                    <Link href="/til">TIL</Link>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent">
                        <Image src="/ico-dark-mode.svg" alt="Dark Mode" width={24} height={24} />
                    </button>
                </div>

                {/* 모바일 메뉴 아이콘 */}
                <div className="flex md:hidden items-center gap-4">
                    {/* 다크 모드 버튼 */}
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent">
                        <Image src="/ico-dark-mode.svg" alt="Dark Mode" width={24} height={24} />
                    </button>

                    {/* 메뉴 버튼 */}
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Image src="/ico-menu.svg" alt="Menu" width={24} height={24} />
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 - 배경 및 슬라이더 메뉴 */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* 배경 */}
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>

                {/* 슬라이더 메뉴 */}
                <div
                    className={`fixed top-0 right-0 h-full w-[70%] bg-gray-900 shadow-lg rounded-l-2xl transform transition-transform duration-300 ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex justify-end p-4">
                        {/* 닫기 버튼 */}
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent"
                            onClick={closeMenu}
                        >
                            {/* 닫기 아이콘 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-8 text-white text-2xl p-8">
                        <li>
                            <Link href="/blog" onClick={closeMenu}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/til" onClick={closeMenu}>
                                TIL
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
