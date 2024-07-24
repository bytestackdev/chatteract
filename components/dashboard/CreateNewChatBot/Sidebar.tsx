'use client'

import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { CiFileOn, CiGlobe } from "react-icons/ci";
import { LuText } from "react-icons/lu";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiNotionFill } from "react-icons/ri";

const Sidebar = () => {
	const pathname = usePathname();

	const TabAndPaths = {
		'files': '/dashboard/create-new-chatbot/files',
		'text': '/dashboard/create-new-chatbot/text',
		'website': '/dashboard/create-new-chatbot/website',
		'qna': '/dashboard/create-new-chatbot/qna',
		'notion': '/dashboard/create-new-chatbot/notion',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['files']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['files'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiFileOn fontSize={'20px'} />
						<p >Files</p>
					</div>
				</Link>
				<Link href={TabAndPaths['text']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['text'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<LuText fontSize={'20px'} />
						<p >Text</p>
					</div>
				</Link>
				<Link href={TabAndPaths['website']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['website'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiGlobe fontSize={'20px'} />
						<p>Website</p>
					</div>
				</Link>
				<Link href={TabAndPaths['qna']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['qna'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<VscCommentDiscussion fontSize={'20px'} />
						<p>Q&A</p>
					</div>
				</Link>
				<Link href={TabAndPaths['notion']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['notion'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<RiNotionFill fontSize={'20px'} />
						<p >Notion</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default Sidebar