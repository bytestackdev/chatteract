'use client'
import CustomSkeleton from '@/components/ui/CustomSkeleton'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingsPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('settings/general')
	}, [router])

	return <>
		<CustomSkeleton />
	</>
}

export default SettingsPage