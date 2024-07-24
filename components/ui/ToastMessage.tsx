'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface ToastMessageProps {
  message: string
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (message) {
      toast.loading(message)

      const params = new URLSearchParams(searchParams.toString())
      params.delete('message')

      router.replace(`?${params.toString()}`)
    }
  }, [message, searchParams, router])

  return null
}

export default ToastMessage
