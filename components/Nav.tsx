import Link from "next/link";

export default function Nav() {
  return (
    <nav className="py-4 px-8 bg-gradient-to-r text-white">
      <div className="flex justify-between items-center mx-auto max-w-4xl">
        <div className="text-xl font-bold">
          <Link href="/">dowit-log</Link>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            {/* <li>
              <Link href="/about">About</Link>
            </li> */}
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/til">TIL</Link>
            </li>
          </ul>
          <ul className="flex gap-4">
            <button className="w-8 h-8 bg-black rounded-full text-black opacity-10"></button>
            <div className="w-8 h-8 bg-black rounded-full text-black opacity-10"></div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
