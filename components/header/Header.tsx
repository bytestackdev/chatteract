'use client' // Mark this component as a client component

import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Navigation } from './Navigation';
import AuthButton from '../WebUI/AuthButton';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <div className="sticky top-0 w-full bg-white z-50 transition-shadow duration-300 shadow-none">
      <div className="flex flex-row justify-between items-center p-4 md:p-10">
        <div className="flex flex-row gap-2 items-center">
          <div className="block md:hidden">
            <FaBars />
          </div>
          <Link href={'/'}>
            <p className="font-semibold">BYTESTACK.AI</p>
          </Link>
        </div>
        <div className="hidden md:block">
          <Navigation />
        </div>
        {isLoggedIn && <AuthButton />}
      </div>
      <div className="block md:hidden p-4">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
