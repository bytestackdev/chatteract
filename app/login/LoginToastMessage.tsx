'use client'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

interface LoginToastMessage {
	message: string
}

const LoginToastMessage: React.FC<LoginToastMessage> = ({ message }) => {

	useEffect(() => {
		if (message) {
			toast.error(`${message}`)
		}
	}, [message])

	return (
		<></>
	)
}

export default LoginToastMessage