import { Button } from '@/components/ui/button'
import React from 'react'

interface IntegrationCardProps {
	cardData: {
		title: string
		description: string
	}
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ cardData }) => {
	return (
		<div className='w-full relative rounded-lg border bg-white p-6 font-normal border-zinc-200 hover:shadow-sm transition-all'>
			<div className='flex flex-col gap-4 h-full'>
				<span className='w-10'></span>
				<div className='flex-1'>
					<div className='flex gap-2'>
						<div className='text-zinc-800 font-medium'>{cardData.title}</div>
					</div>
					<span className='whitespace-normal text-left text-sm text-zinc-500'>{cardData.description}</span>
				</div>
				<Button variant={'outline'}>Subscribe to enable</Button>
			</div>
		</div>
	)
}

export default IntegrationCard