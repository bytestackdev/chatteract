import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import React from 'react'

const SettingsSecurityMainView = () => {
	return (
		<form action="" id='security-form'>
			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 mb-16 gap-5'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Security</h3>
				</div>
				<div className='p-6 pt-0'>
					<div className='mt-4 pb-8'>
						<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-semibold text-zinc-700'>
							Visibility
						</label>
						<div className='space-y-2 mt-2'>
							<Select defaultValue='private'>
								<SelectTrigger className="w-full">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="private">Private</SelectItem>
									<SelectItem value="public">Public</SelectItem>
								</SelectContent>
							</Select>

							<div className='mt-2 mx-2'>
								<span className='md:text-sm text-xs text-zinc-500'>&apos;private&apos;: No one can access your chatbot except you (your account)</span>
								<br />
								<span className='md:text-sm text-xs mt-1 text-zinc-500'>
								&apos;public&apos;: Other people can chat with your chatbot if you send them the link. You can also embed it on your website so your website visitors are able to use it.
								</span>
							</div>
						</div>
					</div>

					<div className='pb-8'>
						<div>
							<label htmlFor="" className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block pb-2 text-sm font-semibold text-zinc-700'>
								Only allow the iframe and widget on specific domains
							</label>
							<div className='space-y-2'>
								<Switch />
							</div>
						</div>
						<div className='pt-4'>
							<label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2 text-base font-semibold text-zinc-700'>
								Allowed Domains
							</label>
							<div className='space-y-2'>
								<textarea name="" id="" placeholder='example.com' maxLength={400} className='min-h-[80px] sm:overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-2 dark:ring-offset-zinc-950 focus-visible:ring-offset-1 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50'></textarea>
								<div className='mt-2 mx-2'>
									<span className='md:text-sm text-xs text-zinc-500'>Enter each domain in a new line</span>
									<br />
									<span className='md:text-sm mt-1 text-xs text-zinc-500'>
										Domains you want to embed your chatbot on. Your chatbot visibility has to be &apos;public&apos; for this to work.
									</span>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className='flex justify-between'>
							<label className='block font-medium text-zinc-700'>Rate Limiting</label>
							<Button variant={'outline'} >Reset</Button>
						</div>
						<div className='mt-1 text-sm text-zinc-700 flex flex-row flex-wrap justify-items-start '>
							<p>Limit to</p>
							<div className='space-y-2'>
								<Input className=' w-20 h-6 mx-2' type='number' value={20} />
							</div>
							<p>messages every</p>
							<div className='space-y-2'>
								<Input className=' w-20 h-6 mx-2 px-3 py-2' type='number' value={240} />
							</div>
							seconds.
						</div>
						<p className='block mt-2 md:text-sm text-xs text-zinc-500'>
							Limit the number of messages sent from one device on the iframe and chat bubble (this limit will not be applied to you on chatbase.co, only on your website for your users to prevent abuse).
						</p>
						<br />
						<div className='mt-6 text-sm text-zinc-700'>
							Message to show when limit is hit
							<div className='space-y-2'>
								<Input className=' mt-2' value={'Too many messages in a row'} />
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

export default SettingsSecurityMainView