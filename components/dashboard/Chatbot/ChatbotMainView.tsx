import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ChatbotMainView = () => {
	return (
		<>
			<div className=' flex justify-center items-center h-full mt-20'>
				<div className=' flex-1'>
				<div className='mx-auto max-w-3xl px-3 pb-12'>
					<div className='flex w-full items-center justify-between '>
						<h1 className=' my-8 text-3xl font-bold  text-black  md:text-3xl'>Chatbots</h1>
					</div>
					<div>
						<div className='py-16'>
							<div className='flex justify-center'>
								<Link href={'/dashboard/create-new-chatbot/files'}>
									<Button>New Chatbot</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</>
	)
}

export default ChatbotMainView