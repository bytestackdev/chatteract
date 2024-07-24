'use client'
import React, { useState } from 'react';
import { GoTrash } from "react-icons/go";

interface QnA {
	question: string;
	answer: string;
}

const MainQnAView: React.FC = () => {
	const [qnaList, setQnaList] = useState<QnA[]>([]);

	const handleAddQnA = () => {
		setQnaList([...qnaList, { question: '', answer: '' }]);
	};

	const handleRemoveQnA = (index: number) => {
		const newList = [...qnaList];
		newList.splice(index, 1);
		setQnaList(newList);
	};

	const handleChange = (index: number, field: keyof QnA, value: string) => {
		const newList = [...qnaList];
		newList[index][field] = value;
		setQnaList(newList);
	};

	const handleDeleteAll = () => {
		setQnaList([]);
	};

	return (
		<div className='p-8 border border-gray-200 rounded-lg'>
			<h2 className='text-2xl font-semibold mb-5'>Q&A</h2>
			<div className='max-h-[800px] overflow-y-auto pr-2'>
				<div className="flex justify-end gap-5 items-center mb-4">
					{qnaList.length !== 0 &&
						<button
							onClick={handleDeleteAll}
							className="text-red-500 text-sm font-semibold hover:bg-red-100 transition-all transform duration-200 p-3 rounded-md">
							Delete all
						</button>}
					<button
						onClick={handleAddQnA}
						className="bg-zinc-100 hover:bg-zinc-200 transition-all transform duration-200 text-gray-500 w-10 h-10 text-2xl rounded-md"
					>
						+
					</button>
				</div>
				{qnaList.map((qna, index) => (
					<div key={index} className="mb-4 border rounded p-4 ">
						<div className="flex justify-between items-center mb-2">
							<label className="block text-gray-700">Question</label>
							<button
								onClick={() => handleRemoveQnA(index)}
								className="text-red-500 hover:bg-red-100 transition-all transform duration-200 p-3 rounded-md"
							>
								<GoTrash fontSize={'20px'} />
							</button>
						</div>
						<textarea
							className="w-full p-2 border rounded mb-2"
							value={qna.question}
							onChange={(e) =>
								handleChange(index, 'question', e.target.value)
							}
						/>
						<label className="block text-gray-700 mb-1">Answer</label>
						<textarea
							className="w-full p-2 border rounded"
							value={qna.answer}
							rows={7}
							onChange={(e) =>
								handleChange(index, 'answer', e.target.value)
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default MainQnAView;
