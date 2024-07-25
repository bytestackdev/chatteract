'use client'

import SettingsLayout from '@/app/layouts/SettingsLayout'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingMainView = () => {
	const router = useRouter()

	useEffect(	() => {
		router.push('/dashboard/settings/general')
	}, [router])
	
	return (
		<SettingsLayout>
			<div className=' flex justify-center items-center h-full mt-20'>
				settings Page
			</div>
		</SettingsLayout>

	)
}

export default SettingMainView