export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-xl font-bold">dowit-log</div>
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 bg-white rounded-full text-black"></button>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </nav>
  );
}
