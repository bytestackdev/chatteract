import { Button } from '@/components/ui/button'
import React from 'react'

const AiMainView = () => {
	return (
		<div className='pb-16'>
			<form action="" id='ai-settings-form'>
				<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
					<div className='flex flex-col space-y-1.5 p-6'>
						<h3 className='text-2xl font-semibold leading-none tracking-tight'>AI</h3>
					</div>
					<div className='p-6 pt-0'>
						<div className='pb-8'>
							<label htmlFor="" className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-4 mb-2 block font-semibold text-base text-zinc-700'>
								Model
								<div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300 border-transparent bg-violet-100 text-violet-600 hover:bg-violet-100/80 dark:bg-violet-800 dark:text-violet-50 dark:hover:bg-violet-800/80 mb-1 ml-2'>
									gpt-4o-mini is now available
								</div>
							</label>
							<div className='space-y-2'>
								<p>slecttt</p>
								<div className='ml-2 pt-1'>
									<p className='mt-2 font-semibold text-sm text-zinc-700'>gpt-4o is the most advanced OpenAI model available.</p>
									<p className='mt-2 text-sm text-zinc-500'>gpt-4o: 1 credit per response</p>
									<p className='mt-2 text-sm text-zinc-500'>gpt-4o-mini: 1 credit per response</p>
									<p className='mt-2 text-sm text-zinc-500'>gpt-4-turbo: 10 credits per response</p>
									<p className='mt-2 text-sm text-zinc-500'>gpt-4: 20 credits per response</p>
									<p className='mt-2 text-sm text-zinc-500'>gpt-3.5-turbo: 1 credit per response</p>
								</div>
							</div>
						</div>

						<div className='mt-6 mb-6'>
							<div className='flex flex-col justify-between align-baseline md:flex-row'>
								<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4 block font-semibold text-base text-zinc-700'>
									Instructions
								</label>
								<div className='flex flex-row items-end gap-4 pb-4'>
									<div className='space-y-2 flex-grow'>
										<p>Chabotss dropdown</p>
										<Button variant={'outline'}>Reset</Button>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-6'>
							<div className='space-y-2'>
								<div className='space-y-1'>
									<div className='flex items-center justify-between'>
										<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block font-semibold text-base text-zinc-700'>
											Temperature
										</label>
										<div className='flex items-center gap-2 font-semibold text-sm text-zinc-700'>
											<label>0</label>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info h-4 w-4 cursor-pointer" data-state="closed"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
										</div>
									</div>

									<div>
										<input id="steps-range" min="0" max="1" step="0.1" className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-zinc-700 dark:bg-zinc-700" type="range" value="0" />
										<div className='flex justify-between'>
											<p className='text-xs text-zinc-700'>Reserved</p>
											<p className='text-xs text-zinc-700'>Creative</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='items-center p-6 pt-0 flex justify-end'>
						<Button>Save</Button>
					</div>
				</div>
			</form>

			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 mt-16 mx-auto'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Training</h3>
				</div>
				<div className='p-6 pt-0'>
					<div className='pb-8'>
						<label htmlFor="" className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-base font-semibold text-zinc-700'>
							Last trained at
						</label>
						<div className='mt-1 font-medium text-zinc-900'>July 25, 2024 at 11:13 AM</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AiMainView