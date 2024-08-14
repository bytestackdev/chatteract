'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DataSources = () => {
	const { chatbotId } = useParams()
	const supabase = createClient()
	const [name, setName] = useState('')
	const router=  useRouter()

	const handleActiveChatbot = async () => {
		try {
			if (!chatbotId) {
				console.error('Chatbot ID is not available');
				return;
			}

			const { data, error } = await supabase
				.from('chatbots')
				.update({ active: true, name: name })
				.eq('id', chatbotId)
				.select('id');

			if (error) {
				console.error('Error updating chatbot:', error);
			} else {
				console.log('Chatbot activated:', data);
				router.push('/dashboard/chatbots')
			}
		} catch (error) {
			console.log('error->', error)
		}
	};

	return (
		// <div className='border border-gray-200 rounded-lg p-4'>
		// 	<h2 className='font-semibold text-center'>Sources</h2>
		// 	<div className=' mt-3'>
		// 		<label className=' text-sm text-slate-700'>Name of the Chatbot</label>
		// 		<Input value={name} onChange={(e) => setName(e.target.value)} />
		// 	</div>
		// 	<Button disabled={name.length === 0} onClick={handleActiveChatbot} className=' w-full mt-8'>Create Chatbot</Button>
		// </div>
		<></>
	)
}

export default DataSources