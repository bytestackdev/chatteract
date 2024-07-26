import { Button } from '@/components/ui/button'
import React from 'react'

const EmbedMainView = () => {
	return (
		<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col gap-2'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<h3 className='text-2xl font-semibold leading-none tracking-tight'>Embed</h3>
			</div>
			<div className='p-6 pt-0 flex flex-col gap-2'>
				<div className=' w-full items-center justify-between gap-5'>
					<span className='font-medium text-zinc-950'>Chatbot is private, to share the chatbot change the visibility to public.</span>
					<div className='flex flex-row mt-5 justify-end'>
						<Button>Make Public</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmbedMainView