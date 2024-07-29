import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const SettingGeneralMainView = () => {
	return (
		<div className='pb-16'>
			<form action="" id='general-account-form'>
				<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
					<div className='flex flex-col space-y-1.5 p-6'>
						<h3 className='text-2xl font-semibold leading-none tracking-tight'>General</h3>
					</div>
					<div className='p-6 pt-0 flex flex-col gap-4'>
						<div className='space-y-2'>
							<label htmlFor="" className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Team Name</label>
							<Input />
						</div>
						<div className='space-y-2'>
							<label htmlFor="" className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Team URL</label>
							<Input />
							<p className='text-[0.8rem] text-zinc-500 dark:text-zinc-400'>Updating Team URL will cause a redirect to the new url.</p>
						</div>
					</div>
					<div className='flex items-center p-6 pt-0 justify-end'>
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
					<h3 className='text-2xl font-semibold leading-none tracking-tight text-red-500'>Delete Team</h3>
				</div>
				<div className='p-6 pt-0'>
					<p>Once you delete your team account, there is no going back. Please be certain.</p>
					<p>
						All your uploaded data and trained chatbots will be deleted.
						<b>&nbsp; This action is not reversible</b>
					</p>
				</div>

				<div className='flex items-center p-6 pt-0 justify-end'>
					<Button variant={'destructive'}>Delete</Button>
				</div>
			</div>

		</div>
	)
}

export default SettingGeneralMainView