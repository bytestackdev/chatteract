'use client'
import { LoadingButton } from '@/components/extension/LoadingButton'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import { IngestestedTextType } from '@/types/type'
import { createClient } from '@/utils/supabase/client'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const MainTextView = () => {
	const supabase = createClient()
	const [text, setText] = useState('')
	const [ingestedData, setIngestedData] = useState<IngestestedTextType>()
	const [loading, setLoading] = useState(false)
	const { chatbotId, id } = useParams()

	const fetchTextData = useCallback(async () => {
		try {
			setLoading(true)
			const { data, error } = await supabase.from('ingesteddata').select('*').eq('chatbot_id', chatbotId || id).eq('type', 'text')
			if (data) {
				setText(data[0].content)
				setIngestedData(data[0])
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}, [supabase, chatbotId, id])

	useEffect(() => {
		fetchTextData()
	}, [fetchTextData])


	const generateEmbeddingsAndStoreInDB = async () => {

		if (!text) {
			toast.error('Please provide the text to generate embedding')
			return null;
		}

		const dataObject = {
			text: text,
			metadata: {
				length: text.length
			},
		}

		const { data, error } = await supabase.from('ingesteddata').insert({ content: text, type: 'text', chatbot_id: chatbotId }).select('id')

		if (error) {
			console.error('Error inserting data to DB:', error);
			throw new Error('Failed to insert data to DB')
		}

		const ingestedDocId = data[0].id

		try {
			setLoading(true)
			const response = await axios.post('/api/embedding-service', { data: dataObject, chatbotId: chatbotId, dataType: 'text', ingestedDocId: ingestedDocId })

			if (response.status === 200) {
				toast.success('Embeddings generated and stored successfully')
				setText('')
			} else {
				toast.error('Failed to generate embeddings and store in DB')
				console.error(response)
				return null;
			}
		} catch (error) {
			console.error('Error generating embeddings:', error)
			toast.error('Failed to generate embeddings. Please try again')
			return null;
		} finally {
			setLoading(false)
			fetchTextData()
		}
	}

	const updatedEmbeddingsAndStoreInDB = async () => {
		if (!ingestedData) {
			toast.error('No data to update')
			return null;
		}

		const { error: ingestedDbError } = await supabase.from('ingesteddata').delete().eq('id', ingestedData.id)

		if (ingestedDbError) {
			console.error('Error deleting existing ingested data:', ingestedDbError.message)
			toast.error('Failed to delete existing ingested data')
			return null;
		}

		if (!text) {
			toast.error('Please provide the text to generate embedding')
			return null;
		}

		const dataObject = {
			text: text,
			metadata: {
				length: text.length
			},
		}

		const { data, error } = await supabase.from('ingesteddata').insert({ content: text, type: 'text', chatbot_id: id }).select('id')

		if (error) {
			console.error('Error inserting data to DB:', error);
			throw new Error('Failed to insert data to DB')
		}

		const ingestedDocId = data[0].id

		try {
			setLoading(true)
			const response = await axios.post('/api/embedding-service', { data: dataObject, chatbotId: id, dataType: 'text', ingestedDocId: ingestedDocId })

			if (response.status === 200) {
				toast.success('Embeddings generated and stored successfully')
				setText('')
			} else {
				toast.error('Failed to generate embeddings and store in DB')
				console.error(response)
				return null;
			}
		} catch (error) {
			console.error('Error generating embeddings:', error)
			toast.error('Failed to generate embeddings. Please try again')
			return null;
		} finally {
			setLoading(false)
			fetchTextData()
		}
	}


	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Text</h2>
			<LoadingWrapper loading={loading}>
				<div className=''>
					<textarea onChange={(e) => setText(e.target.value)} value={text} rows={15} placeholder='Enter text...' className='p-2 w-full border border-gray-200 rounded-lg' />
				</div>
			</LoadingWrapper>
			{text && (
				<p className=' mt-5 text-center'>
					{text.length} Characters
				</p>
			)}

			{chatbotId && <LoadingButton className='mt-2' loading={loading} onClick={generateEmbeddingsAndStoreInDB}>Generate Embeddings</LoadingButton>}
			{id && <LoadingButton className='mt-2' loading={loading} onClick={updatedEmbeddingsAndStoreInDB}>Updated Embeddings</LoadingButton>}
		</div>
	)
}

export default MainTextView