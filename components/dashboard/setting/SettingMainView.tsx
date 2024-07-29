'use client'

import SettingsLayout from '@/app/layouts/SettingsLayout'
import CustomSkeleton from '@/components/ui/CustomSkeleton'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingMainView = () => {
	const router = useRouter()

	useEffect(	() => {
		router.push('/dashboard/settings/general')
	}, [router])
	
	return <>
		<CustomSkeleton />
	</>
}

export default SettingMainView