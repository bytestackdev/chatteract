'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoGear } from "react-icons/go";
import { LuText, LuUsers2 } from 'react-icons/lu';
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { IoMdCode } from "react-icons/io";
import { IoBarChart, IoShareOutline } from "react-icons/io5";
import { RiNotionFill, RiStackLine } from 'react-icons/ri';
import { CiChat2, CiFileOn, CiGlobe } from 'react-icons/ci';
import { VscCommentDiscussion } from 'react-icons/vsc';


const SourcesSidebar = () => {
	const pathname = usePathname();

	const TabAndPaths = {
		'files': 'files',
		'text': 'text',
		'website': 'website',
		'qna': 'qna',
		'notion': 'notion',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['files']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['files']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiFileOn fontSize={'20px'} />
						<p >Files</p>
					</div>
				</Link>
				<Link href={TabAndPaths['text']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['text']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<LuText fontSize={'20px'} />
						<p >Text</p>
					</div>
				</Link>
				<Link href={TabAndPaths['website']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['website']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiGlobe fontSize={'20px'} />
						<p>Website</p>
					</div>
				</Link>
				<Link href={TabAndPaths['qna']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['qna']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<VscCommentDiscussion fontSize={'20px'} />
						<p>Q&A</p>
					</div>
				</Link>
				<Link href={TabAndPaths['notion']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname.includes(TabAndPaths['notion']) ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<RiNotionFill fontSize={'20px'} />
						<p >Notion</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default SourcesSidebar