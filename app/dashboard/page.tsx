'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/chatbots')
  }, [router])

  return <></>
}

export default DashboardPage