'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const dummyChatbots = [
	{
		id: 1,
		name: 'Test chatbot'
	}
]

const ChatbotMainView = () => {
	const [chatbots, setChatbots] = useState(dummyChatbots)
	return (
		<>
			<div className=' flex justify-center items-center h-full mt-20'>
				<div className=' flex-1'>
					<div className='mx-auto max-w-3xl px-3 pb-12'>
						<div className='flex w-full items-center justify-between '>
							<h1 className=' my-8 text-3xl font-bold  text-black  md:text-3xl'>Chatbots</h1>
							{chatbots.length > 0 && <div>
								<Link href={'/dashboard/create-new-chatbot/files'}>
									<Button>New Chatbot</Button>
								</Link>
							</div>}
						</div>
						{!chatbots.length && <div>
							<div className='py-16'>
								<div className='flex justify-center'>
									<Link href={'/dashboard/create-new-chatbot/files'}>
										<Button>New Chatbot</Button>
									</Link>
								</div>
							</div>
						</div>}

						{
							chatbots.map(chatbot => (
								<div key={chatbot.id}>
									<div className='m-auto my-8  grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4'>
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
								</div>
							))
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default ChatbotMainView