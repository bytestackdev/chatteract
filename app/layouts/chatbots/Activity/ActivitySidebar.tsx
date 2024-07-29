'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoGear } from "react-icons/go";
import { LuUsers2 } from 'react-icons/lu';
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { IoMdCode } from "react-icons/io";
import { IoBarChart, IoShareOutline } from "react-icons/io5";
import { RiStackLine } from 'react-icons/ri';
import { CiChat2 } from 'react-icons/ci';


const ActivitySidebar = () => {
	const pathname = usePathname();

	const TabAndPaths = {
		'chat-logs': 'chat-logs',
		'leads': 'leads',
		'analytics': 'analytics',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['chat-logs']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['chat-logs']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiChat2 fontSize={'20px'} />
						<p >Chat Logs</p>
					</div>
				</Link>
				<Link href={TabAndPaths['leads']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['leads']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<LuUsers2 fontSize={'20px'} />
						<p >Leads</p>
					</div>
				</Link>
				<Link href={TabAndPaths['analytics']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['analytics']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<IoBarChart fontSize={'20px'} />
						<p>Analytics</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default ActivitySidebar