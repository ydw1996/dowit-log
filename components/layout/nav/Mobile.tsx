'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
    label: string;
    path: string;
}

const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'TIL', path: '/til' },
];

export default function MobileNav() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* 모바일 메뉴 */}
            <div className="flex md:hidden items-center gap-4">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent">
                    <Image src="/ico-dark-mode.svg" alt="Dark Mode" width={24} height={24} />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Image src="/ico-menu.svg" alt="Menu" width={24} height={24} />
                </button>
            </div>

            {/* 슬라이드 메뉴 */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* 배경 */}
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
                <div
                    className={`fixed top-0 right-0 h-full w-[70%] bg-black/50 backdrop-blur-lg shadow-lg rounded-l-2xl transform transition-transform duration-300 ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* 닫기버튼 */}
                    <div className="flex justify-end p-4">
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent"
                            onClick={closeMenu}
                        >
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
                    <ul className="flex flex-col gap-6 text-white text-xl p-8">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    onClick={closeMenu}
                                    className={`block px-4 py-2 rounded-lg ${
                                        pathname === item.path
                                            ? 'bg-primary-01/30'
                                            : 'hover:bg-gray-700/30'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
