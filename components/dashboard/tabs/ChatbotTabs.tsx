"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ChatbotTabs: React.FC = () => {
  const pathname = usePathname();

  // Split the pathname and get the 'id' part, which should be the segment after 'chatbots'
  const pathSegments = pathname.split('/');
  const idIndex = pathSegments.indexOf('chatbots') + 1;
  const id = pathSegments[idIndex];

  const TabAndPaths = {
    'playground': `/dashboard/chatbots/${id}`,
    'activity': `/dashboard/chatbots/${id}/activity`,
    'sources': `/dashboard/chatbots/${id}/sources`,
    'connect': `/dashboard/chatbots/${id}/connect`,
    'settings': `/dashboard/chatbots/${id}/settings`,
  };

  return (
    <div className="flex justify-center items-center border-b border-gray-300 gap-5 mt-10">
      <Link 
        href={TabAndPaths['playground']} 
        className={`py-1 px-3 text-sm text-center ${pathname === TabAndPaths['playground'] ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        PlayGround
      </Link>
      <Link 
        href={TabAndPaths['activity']} 
        className={`py-1 px-3 text-sm text-center ${pathname === TabAndPaths['activity'] ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Activity
      </Link>
      <Link 
        href={TabAndPaths['sources']} 
        className={`py-1 px-3 text-sm text-center ${pathname === TabAndPaths['sources'] ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Sources
      </Link>
      <Link 
        href={TabAndPaths['connect']} 
        className={`py-1 px-3 text-sm text-center ${pathname === TabAndPaths['connect'] ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Connect
      </Link>
      <Link 
        href={TabAndPaths['settings']} 
        className={`py-1 px-3 text-sm text-center ${pathname === TabAndPaths['settings'] ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-500 hover:text-blue-500'}`}
      >
        Settings
      </Link>
    </div>
  );
};

export default ChatbotTabs;
