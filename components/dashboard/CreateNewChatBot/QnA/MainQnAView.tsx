'use client'
import { LoadingButton } from '@/components/extension/LoadingButton';
import LoadingWrapper from '@/components/ui/LoadingWrapper';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GoTrash } from "react-icons/go";

interface QnA {
	question: string;
	answer: string;
}

const MainQnAView: React.FC = () => {
	const [qnaList, setQnaList] = useState<QnA[]>([]);
	const { chatbotId, id } = useParams()
	const supabase = createClient()
	const [loading, setLoading] = useState(false);

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

	const handleInjestingQuestions = async () => {
		try {
			setLoading(true);
			const records = qnaList.map((item) => ({
				chatbotid: chatbotId,
				questions: item.question,
				answers: item.answer,
			}));

			const { data, error } = await supabase
				.from('qna')
				.insert(records)
				.select('id');

			if (error) {
				toast.error('Error inserting records')
				return;
			}

			toast.success('Records inserted successfully')
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const updateInjestingQuestions = async () => {
		try {
			setLoading(true);

			// Step 1: Delete existing records with the specified chatbot ID
			const { error: deleteError } = await supabase
				.from('qna')
				.delete()
				.eq('chatbotid', id);

			if (deleteError) {
				toast.error('Error deleting existing records');
				return;
			}

			// Step 2: Prepare the new records to insert
			const records = qnaList.map((item) => ({
				chatbotid: id,
				questions: item.question,
				answers: item.answer,
			}));

			// Step 3: Insert the new records
			const { data, error: insertError } = await supabase
				.from('qna')
				.insert(records);

			if (insertError) {
				toast.error('Error inserting new records');
				return;
			}

			toast.success('Records updated successfully');
		} catch (error) {
			console.log(error);
			toast.error('Unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		(async () => {
			try {
				setLoading(true)
				const response = await supabase.from('qna').select('*').eq('chatbotid', id)
				if (response.status === 200) {
					const { data } = response

					if (!data) {
						toast.error('Error fetching the Question and Answers')
						return;
					}
					const qnaResponseList: QnA[] = data?.map(item => (
						{
							question: item.questions,
							answer: item.answers
						}
					))
					setQnaList(qnaResponseList)
				}
			} catch (error) {
				console.log(error)
				toast.error('Error fetching the Question and Answers')
			} finally {
				setLoading(false)
			}
		})()
	}, [id, supabase])

	return (
		<LoadingWrapper loading={loading}>
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
				<div className=' flex justify-end'>
					{chatbotId && <LoadingButton onClick={handleInjestingQuestions}>Injest</LoadingButton>}
					{id && <LoadingButton className='mt-2' onClick={updateInjestingQuestions}>Update Injested Questions</LoadingButton>}
				</div>
			</div>
		</LoadingWrapper>
	);
};

export default MainQnAView;
