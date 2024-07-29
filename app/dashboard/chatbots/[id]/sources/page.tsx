'use client'
import CustomSkeleton from '@/components/ui/CustomSkeleton'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SourcesPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('sources/files')
	}, [router])

	return (
		<CustomSkeleton />
	)
}

export default SourcesPage