'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
    label: string;
    path: string;
}

const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'TIL', path: '/til' },
];

export default function DesktopNav() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`${
                        pathname === item.path ? 'font-semibold border-b-2 border-primary-02' : ''
                    }`}
                >
                    {item.label}
                </Link>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent">
                {/* 다크 모드 아이콘 */}
                <Image src="/ico-dark-mode.svg" alt="Dark Mode" width={24} height={24} />
            </button>
        </div>
    );
}
