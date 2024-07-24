import React from 'react'
import FileUploaderChat from './FileUploaderChat'

const MainFileView = () => {
	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Files</h2>
			<div className=' border border-gray-200 rounded-lg'>
				<FileUploaderChat />
			</div>
		</div>
	)
}

export default MainFileView