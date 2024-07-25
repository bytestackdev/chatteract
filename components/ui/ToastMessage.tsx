'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

const ToastMessage: React.FC = () => {
  const searchParams = useSearchParams()
  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const router = useRouter()

  useEffect(() => {
    if (message) {
      if(status === 'error'){
        toast.error(message)
      }else{
        toast.success(message)
      }
      const params = new URLSearchParams(searchParams.toString())
      params.delete('message')
      params.delete('status')
      router.replace(`?${params.toString()}`)
    }
     
  }, [message, router, searchParams, status])

  return null
}

export default ToastMessage
