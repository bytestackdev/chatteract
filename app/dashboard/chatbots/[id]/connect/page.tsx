'use client'
import ConnectLayout from '@/app/layouts/chatbots/Connect/ConnectLayout'
import CustomSkeleton from '@/components/ui/CustomSkeleton'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ConnectPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('connect/embed')
	}, [router])

	return <>
		<CustomSkeleton />
	</>
}

export default ConnectPage