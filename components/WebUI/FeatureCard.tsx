import Image from 'next/image'
import React from 'react'

interface FeatureCardProps {
  cardUrl: string
  title: string
  subtitle: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ cardUrl, title, subtitle }) => {
  return (
    <div className=' border rounded-md hover:shadow-lg transition-all duration-500 ease-in-out'>
      <div className=' bg-zinc-200 p-10 pb-0'>
        <Image src={cardUrl} className=' w-full h-full' unoptimized width={100} height={100} alt='Feature card' />
      </div>
      <div className=' p-5'>
        <p className='text-2xl font-semibold'>{title}</p>
        <p className='text-base text-gray-600'>{subtitle}</p>
      </div>
    </div>
  )
}

export default FeatureCard