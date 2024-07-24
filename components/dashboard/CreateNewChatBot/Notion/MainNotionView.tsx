import { Button } from '@/components/ui/button'
import React from 'react'
import { RiNotionFill } from 'react-icons/ri'

const MainNotionView = () => {
	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Notion</h2>
			<div className='flex justify-center items-center'>
				<button className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100/70 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 rounded-xl disabled:bg-zinc-100/60 px-4 py-1 h-12 gap-3'>
					<RiNotionFill fontSize={'20px'} />
					Connect Notion
				</button>
			</div>
		</div>
	)
}

export default MainNotionView