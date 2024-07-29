'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import CustomSkeleton from '@/components/ui/CustomSkeleton'

const ActivityPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('activity/chat-logs')
	}, [router])
	return <>
		<CustomSkeleton />
	</>
}

export default ActivityPage