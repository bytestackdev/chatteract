import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const ChatInterfaceMainView = () => {
	return (
		<form action="" id='chat-interface-form'>
			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 mb-16'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Chat Interface</h3>
				</div>

				<div className='p-6 pt-0 pb-0'>
					<div className='mt-2 flex flex-col justify-between md:flex-row md:space-x-8'>
						<div className='w-full flex-1 pb-5 md:w-1/2'>

							<div className='pb-8'>
								<div className='flex flex-row items-end justify-between'>
									<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block font-semibold text-base text-zinc-700'>
										Initial Messages
									</label>
									<Button variant={'outline'}>Reset</Button>
								</div>
								<div className='mt-2'>
									<div className='space-y-2'>
										<textarea name="" id="" placeholder='Hi! What can I help you with?' className='min-h-[80px] sm:overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 dark:ring-offset-zinc-950 focus-visible:ring-offset-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 focus:border-violet-500 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus-visible:ring-ring focus:ring-4 focus:ring-violet-500/10'>
											Hi! What can I help you with?
										</textarea>
										<p className='dark:text-zinc-400 mt-2 ml-1 text-sm text-zinc-500'>Enter each message in a new line.</p>
									</div>
								</div>
							</div>

							<div className='pb-8'>
								<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block font-semibold text-base text-zinc-700'>
									Suggested Messages
								</label>
								<div className='mt-2'>
									<div className='space-y-2'>
										<textarea placeholder='What is example.com?' className='min-h-[80px] sm:overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 dark:ring-offset-zinc-950 focus-visible:ring-offset-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 focus:border-violet-500 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus-visible:ring-ring focus:ring-4 focus:ring-violet-500/10'>
										</textarea>
									</div>
									<p className='mt-2 ml-1 text-sm text-zinc-500'>Enter each message in a new line.</p>
								</div>
							</div>

							<div className='pb-8'>
								<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block font-semibold text-base text-zinc-700'>
									Message Placeholder
								</label>
								<div className='mt-2'>
									<div className='space-y-2'>
										<Input placeholder='Message...' />
									</div>
								</div>
							</div>

							<div className='pb-8'>
								<label htmlFor="" className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1 block font-semibold text-base text-zinc-700'>
									Theme
								</label>
								<Select defaultValue='light'>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='pb-8'>
								<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block font-semibold text-base text-zinc-700'>
									Display Name
								</label>
								<div className='mt-2'>
									<div className='space-y-2'>
										<Input />
									</div>
								</div>
							</div>

						</div>

						<div className='relative mt-8 w-full md:mt-0 md:w-1/2'>
							<div className='sticky top-4 bottom-4'>
								<div className='flex h-[85vh] max-h-[650px] max-w-full flex-auto shrink-0 flex-col overflow-hidden rounded-xl border border-zinc-200 md:max-w-[458px]'>

								</div>
								<div className='mt-4 flex pb-12' style={{ justifyContent: 'flex-end' }}>
									<div className='full flex h-[55px] w-[55px] items-center justify-center rounded-full'>
										<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="none" viewBox="0 0 1120 1120"><title>Chatbase chatbot bubble icon</title><path fill-rule="evenodd" clip-rule="evenodd" fill="white" d="M252 434c0-62 50-112 112-112h406c62 0 112 50 112 112v180l-77-28-5-5-37-100c-2-7-12-7-14 0l-37 100-5 5-100 37c-7 2-7 12 0 14l100 37 5 5 28 77H630l-1 1-51 68c-5 8-17 8-22 0l-51-68-1-1H364c-62 0-112-50-112-112V434Zm382 37c-2-3-6-3-8 0l-7 20-2 2-20 7c-3 2-3 6 0 8l20 7 2 2 7 20c2 3 6 3 8 0l7-20 2-2 20-7c3-2 3-6 0-8l-20-7-2-2-7-20Z"></path><path fill="white" d="M772 756c60-1 109-50 110-110l-77 28-5 5-28 77Z"></path></svg>
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
	)
}

export default ChatInterfaceMainView