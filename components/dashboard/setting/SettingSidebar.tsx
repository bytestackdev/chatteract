'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoGear } from "react-icons/go";
import { LuUsers2 } from 'react-icons/lu';
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { CiCreditCard1 } from 'react-icons/ci';


const SettingSidebar = () => {
	const pathname = usePathname();

	const TabAndPaths = {
		'general': '/dashboard/settings/general',
		'members': '/dashboard/settings/members',
		'plans': '/dashboard/settings/plans',
		'billing': '/dashboard/settings/billing',
	}

	return (
		<div className="w-64 h-full">
			<nav className="flex flex-col p-1 space-y-1">
				<Link href={TabAndPaths['general']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['general'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<GoGear fontSize={'20px'} />
						<p >General</p>
					</div>
				</Link>
				<Link href={TabAndPaths['members']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['members'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<LuUsers2 fontSize={'20px'} />
						<p >Members</p>
					</div>
				</Link>
				<Link href={TabAndPaths['plans']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['plans'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<HiOutlineRectangleStack fontSize={'20px'} />
						<p>Plans</p>
					</div>
				</Link>
				<Link href={TabAndPaths['billing']}>
					<div className={`flex flex-row gap-3 items-center py-2 px-4 font-medium rounded ${pathname === TabAndPaths['billing'] ? 'text-violet-600 bg-zinc-50' : 'hover:bg-zinc-50 hover:text-violet-600'}`}>
						<CiCreditCard1 fontSize={'20px'} />
						<p>Billing</p>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default SettingSidebar