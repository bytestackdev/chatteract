'use client'
import ConnectLayout from '@/app/layouts/chatbots/Connect/ConnectLayout'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ConnectPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('connect/embed')
	}, [router])

	return <></>
}

export default ConnectPage