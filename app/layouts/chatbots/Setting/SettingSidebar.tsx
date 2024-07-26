'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsPeople, BsStars } from 'react-icons/bs';
import { CiGlobe } from 'react-icons/ci';
import { GoGear } from 'react-icons/go';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoBrushOutline } from 'react-icons/io5';
import { PiShieldWarning, PiWebhooksLogo } from "react-icons/pi";


const SettingSidebar = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/');
	const currentPage = pathSegments[pathSegments.length - 1]

	const TabAndPaths = {
		'general': 'general',
		'ai': 'ai',
		'chat-interface': 'chat-interface',
		'security': 'security',
		'leads': 'leads',
		'notifications': 'notifications',
		'webhooks': 'webhooks',
		'custom-domains': 'custom-domains',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['general']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['general'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<GoGear fontSize={'20px'} />
						<p >General</p>
					</div>
				</Link>
				<Link href={TabAndPaths['ai']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['ai'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<BsStars fontSize={'20px'} />
						<p >AI</p>
					</div>
				</Link>
				<Link href={TabAndPaths['chat-interface']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['chat-interface'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<IoBrushOutline fontSize={'20px'} />
						<p>Chat Interface</p>
					</div>
				</Link>
				<Link href={TabAndPaths['security']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['security'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<PiShieldWarning fontSize={'20px'} />
						<p>Security</p>
					</div>
				</Link>
				<Link href={TabAndPaths['leads']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['leads'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<BsPeople fontSize={'20px'} />
						<p>Leads</p>
					</div>
				</Link>
				<Link href={TabAndPaths['notifications']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['notifications'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<IoIosNotificationsOutline fontSize={'20px'} />
						<p>Notifications</p>
					</div>
				</Link>
				<Link href={TabAndPaths['webhooks']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['webhooks'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<PiWebhooksLogo fontSize={'20px'} />
						<p>Webhooks</p>
					</div>
				</Link>
				<Link href={TabAndPaths['custom-domains']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${currentPage === TabAndPaths['custom-domains'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiGlobe fontSize={'20px'} />
						<p>Custom Domains</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default SettingSidebar