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
    console.log('search params:', searchParams)
    console.log(status)
    console.log(message)
  }, [searchParams])

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
     
  }, [message])

  return null
}

export default ToastMessage
