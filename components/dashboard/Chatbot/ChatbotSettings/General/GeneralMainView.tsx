import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const GeneralMainView = () => {
	return (
		<div className='pb-16'>
			<form action="">
				<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col'>
					<div className='flex flex-col space-y-1.5 p-6'>
						<h3 className='text-2xl font-semibold leading-none tracking-tight'>General</h3>
					</div>
					<div className='p-6 pt-0'>
						<div className='flex flex-col gap-1 mt-2 pb-6'>
							<label className='block text-sm font-medium text-zinc-700'>Chatbot ID</label>
							<div className='flex items-center space-x-4'>
								<div className='font-semibold'>VCjLjs0JnK1bn7y9olfkJ</div>
							</div>
						</div>

						<div className='flex flex-col gap-2 pb-6'>
							<label className='block text-sm font-medium text-zinc-700'>Number of characters</label>
							<div className='font-semibold'>
								45,398
							</div>
						</div>

						<div className='flex flex-col gap-3 pb-4'>
							<label className='block text-sm font-medium text-zinc-700'>Name</label>
							<div className='space-y-2'>
								<Input />
							</div>
						</div>
					</div>

					<div className='items-center p-6 pt-0 flex justify-end'>
						<Button>Save</Button>
					</div>
				</div>
			</form>

			<div className='relative my-10'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t'></span>
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-white px-2 font-bold text-red-400'>Danger Zone</span>
				</div>
			</div>

			<div className='rounded-lg border bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 border-red-200'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight text-red-500'>Delete Chatbot</h3>
				</div>

				<div className='p-6 pt-0'>
					<p className='Once you delete your chatbot, there is no going back. Please be certain.'>Once you delete your chatbot, there is no going back. Please be certain.</p>
					<p>
						All your uploaded data will be deleted.
						<b>&nbsp; This action is not reversible</b>
					</p>
				</div>
				<div className='flex items-center p-6 pt-0 justify-end'>
					<Button variant='destructive'>Delete</Button>
				</div>
			</div>

		</div>
	)
}

export default GeneralMainView