'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoGear } from "react-icons/go";
import { LuUsers2 } from 'react-icons/lu';
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { IoMdCode } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import { RiStackLine } from 'react-icons/ri';


const ConnectSidebar = () => {
	const pathname = usePathname();

	const TabAndPaths = {
		'embed': 'embed',
		'share': 'share',
		'intergation': 'integration',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['embed']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['embed']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<IoMdCode fontSize={'20px'} />
						<p >Embed</p>
					</div>
				</Link>
				<Link href={TabAndPaths['share']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['share']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<IoShareOutline fontSize={'20px'} />
						<p >Share</p>
					</div>
				</Link>
				<Link href={TabAndPaths['intergation']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['intergation']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<RiStackLine fontSize={'20px'} />
						<p>Integration</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default ConnectSidebar