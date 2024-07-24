"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Tabs: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center border-b border-gray-300 gap-5 mt-10">
      <Link 
        href="/dashboard/chatbots" 
        className={`py-1 px-3 text-sm text-center ${pathname === '/dashboard/chatbots' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Chatbots
      </Link>
      <Link 
        href="/dashboard/settings" 
        className={`py-1 px-3 text-sm text-center ${pathname === '/dashboard/settings' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Settings
      </Link>
    </div>
  );
};

export default Tabs;
