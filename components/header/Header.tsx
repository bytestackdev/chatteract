'use client' // Add this line to mark the component as a client component

import React, { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Navigation } from './Navigation'
import AuthButton from '../WebUI/AuthButton'
import Link from 'next/link'

interface HeaderProps {
  isLoggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 w-full bg-white transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : ''} z-50`}
    >
      <div className="flex flex-row justify-between items-center p-4">
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
  )
}

export default Header
