'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import SeperatorWithText from '@/components/ui/SeperatorWithText'
import React, { useState } from 'react'
import URLManager from './URLManager'
import axios from 'axios'
import { LoadingButton } from '@/components/extension/LoadingButton'

const MainwebsiteView = () => {

	const [website, setWebsite] = useState()
	const [websiteContent, setWebsiteContent] = useState('')
	const [loading, setLoading] = useState(false)

	const fetchDataFromLink = async () => {
		try {
			setLoading(true)
			const response = await axios.post('/api/webpage-scrap', { url: website });
			console.log('response ->', response)
			const newResponse = await axios.post('/api/embedding-service', { data: response.data })
			console.log('embedding-response ->', newResponse)
			setWebsiteContent(response.data.text)
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Website</h2>
			<div className=''>
				<div className=' flex flex-row gap-3 items-end'>
					<div className=' flex-1'>
						<Label htmlFor='crawl'>Crawl</Label>
						<Input onChange={(e: any) => setWebsite(e.target.value)} name='crawl' className='mt-1' placeholder='https://www.example.com' />
					</div>
					<LoadingButton loading={loading} onClick={fetchDataFromLink}>Fetch links</LoadingButton>
				</div>

				{websiteContent && <span className=' mt-3'>Data is fetched from this site <b>{website}</b></span>}

				<p className=" my-4 text-gray-500 text-sm">This will crawl all the links starting with the URL (not including files on the website).</p>

				<div className='my-4 '>
					<SeperatorWithText text='OR' />
				</div>

				<div className=' flex flex-row gap-3 items-end'>
					<div className=' flex-1'>
						<Label htmlFor='crawl'>Submit Sitemap</Label>
						<Input name='crawl' className='mt-1' placeholder='https://www.example.com/sitemap.xml' />
					</div>
					<Button>Load sitemap</Button>
				</div>

				<div className='my-10'>
					<SeperatorWithText text='Included Links' />
				</div>

				<URLManager />
			</div>
		</div>
	)
}

export default MainwebsiteView