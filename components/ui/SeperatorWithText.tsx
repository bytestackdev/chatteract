import React from 'react'

const SeperatorWithText = ({ text }: { text: string }) => {
	return (
		<div className='flex items-center'>
			<hr className='w-full border-t border-zinc-300' />
			<span className='whitespace-nowrap px-2 text-zinc-600'>{text}</span>
			<hr className='w-full border-t border-zinc-300' />
		</div>
	)
}

export default SeperatorWithText