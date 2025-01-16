'use client';

import Link from 'next/link';

import DesktopNav from './nav/Desktop';
import MobileNav from './nav/Mobile';

export default function Nav() {
    return (
        <nav className="py-4 px-8 bg-gradient-to-r text-white">
            <div className="flex justify-between items-center mx-auto max-w-4xl">
                <Link className="text-xl font-bold" href="/">
                    dowit-log.
                </Link>
                <DesktopNav />
                <MobileNav />
            </div>
        </nav>
    );
}
