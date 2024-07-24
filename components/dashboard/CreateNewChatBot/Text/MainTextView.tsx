'use client'
import React, { useState } from 'react'

const MainTextView = () => {
	const [text, setText] = useState('')

	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Text</h2>
			<div className=''>
				<textarea onChange={(e) => setText(e.target.value)} rows={15} placeholder='Enter text...' className='p-2 w-full border border-gray-200 rounded-lg' />
			</div>
			{text && (
				<p className=' mt-5 text-center'>
					{text.length} Characters
				</p>
			)}
		</div>
	)
}

export default MainTextView