'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SettingsPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('settings/general')
	}, [router])

	return <></>
}

export default SettingsPage