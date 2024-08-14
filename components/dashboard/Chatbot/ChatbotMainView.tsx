'use client'
import { LoadingButton } from '@/components/extension/LoadingButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatbotType } from '@/types/type'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const ChatbotMainView = () => {
	const [chatbots, setChatbots] = useState<ChatbotType[]>([])
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const GotToCreateNewChatBot = async () => {
		try {
			setLoading(true)
			const supabase = createClient()
			const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

			if (sessionError) {
				console.error('Error fetching session:', sessionError);
				return;
			}

			const user = sessionData?.session?.user;
			if (!user) {
				console.error('User not authenticated');
				return;
			}

			// Create a new chatbot entry
			const { data, error: insertError } = await supabase
				.from('chatbots')
				.insert([{ created_by: user.id, name: name }])
				.select('id');

			if (insertError) {
				console.error('Error creating chatbot:', insertError);
				return;
			}

			// Assuming the data array has one item since we're inserting one row
			const newChatbotId = data?.[0]?.id;
			console.log('New chatbot ID:', newChatbotId);

			// Proceed with the redirection if the insertion was successful
			router.push(`/dashboard/create-new-chatbot/${newChatbotId}/files`);
		} catch (error) {

		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const getAllChatbots = async () => {
			const supabase = createClient()
			const { data, error } = await supabase
				.from('chatbots')
				.select('*');

			if (error) {
				console.error('Error fetching chatbots:', error);
				return;
			}

			setChatbots(data);
		}
		getAllChatbots()
	}, [])

	return (
		<>
			<div className=' flex justify-center items-center h-full mt-20 gap-8'>
				<div className=' flex-1'>
					<div className='mx-auto max-w-3xl px-3 pb-12'>
						<div className='flex w-full items-center justify-between '>
							<h1 className=' my-8 text-3xl font-bold  text-black  md:text-3xl'>Chatbots</h1>
						</div>
						{chatbots.length > 0 && <div className='flex-1'>
							<div>
								<label htmlFor="" className=' text-sm font-semibold'>Name Of Chatbot</label>
								<div className='flex flex-row gap-5'>
									<Input value={name} onChange={(e) => setName(e.target.value)} />
									<LoadingButton loading={loading} disabled={name.length === 0} onClick={GotToCreateNewChatBot} >New Chatbot</LoadingButton>
								</div>
							</div>
						</div>}
						{!chatbots.length && <div>
							<div className='py-16'>
								<label htmlFor="" className=' text-sm font-semibold'>Name Of Chatbot</label>
								<div className=' flex flex-row gap-3'>
									<div className=' flex-1'>
										<Input value={name} onChange={(e) => setName(e.target.value)} />
									</div>
									<div className='flex justify-center'>
										<LoadingButton loading={loading} disabled={name.length === 0} onClick={GotToCreateNewChatBot} >New Chatbot</LoadingButton>
									</div>
								</div>
							</div>
						</div>}




						<div className='m-auto my-8 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4'>
							{chatbots.map(chatbot => (
								<div key={chatbot.id}>
									<div className='flex items-center justify-center'>
										<Link href={`/dashboard/chatbots/${chatbot.id}`}>
											<div className=' relative flex w-40  flex-col justify-between  overflow-hidden rounded border'>
												<Image src={'/chatbot-placeholder.png'} width={200} height={200} alt='Chatbot placeholder' />
												<div className=' flex h-14 items-center justify-center px-1'>
													<h3 className='m-auto overflow-hidden text-center text-xs font-semibold md:text-sm1'>{chatbot.name}</h3>
												</div>
											</div>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChatbotMainView