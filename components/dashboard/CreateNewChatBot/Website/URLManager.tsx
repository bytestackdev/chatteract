'use client'
import React, { useState } from 'react';
import { GoTrash } from 'react-icons/go';

const URLManager: React.FC = () => {
	const [urlList, setUrlList] = useState<string[]>([]);

	const handleAddURL = () => {
		setUrlList([...urlList, '']);
	};

	const handleRemoveURL = (index: number) => {
		const newList = [...urlList];
		newList.splice(index, 1);
		setUrlList(newList);
	};

	const handleChange = (index: number, value: string) => {
		const newList = [...urlList];
		newList[index] = value;
		setUrlList(newList);
	};

	const handleDeleteAll = () => {
		setUrlList([]);
	};

	return (
		<div className='max-h-[500px] overflow-y-auto pr-2'>
			<div className="flex justify-end gap-5 items-center mb-4 ">
				{urlList.length !== 0 &&
					<button
						onClick={handleDeleteAll}
						className="text-red-500 text-sm font-semibold hover:bg-red-100 transition-all transform duration-200 p-3 rounded-md">
						Delete all
					</button>}
				<button
					onClick={handleAddURL}
					className="bg-zinc-100 hover:bg-zinc-200 transition-all transform duration-200 text-gray-500 w-10 h-10 text-2xl rounded-md"
				>
					+
				</button>
			</div>
			{urlList.map((url, index) => (
				<div key={index} className="flex items-center mb-2">
					<input
						type="text"
						className="w-full p-2 border rounded mr-2"
						value={url}
						onChange={(e) => handleChange(index, e.target.value)}
						placeholder="https://www.example.com/"
					/>
					<button
						onClick={() => handleRemoveURL(index)}
						className="text-red-500 hover:bg-red-100 transition-all transform duration-200 p-3 rounded-md"
					>
						<GoTrash fontSize={'20px'} />
					</button>
				</div>
			))}
		</div>
	);
};

export default URLManager;
