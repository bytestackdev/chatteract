import React from 'react'
import BillingDetailItems from './BillingDetailItems'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SettingBillingMainView = () => {
	return (
		<section className='max-w-screen-lg flex flex-col gap-6 text-nowrap pb-16'>
			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 whitespace-normal'>
				<div className='flex flex-col space-y-1.5 p-6 font-bold'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Subscription Details</h3>
				</div>

				<div className='p-6 pt-0 flex flex-col'>
					<div className='text-sm tracking-tight'>
						<p className='inline'>You are on the </p>
						<div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300 border-transparent bg-violet-100 text-violet-600 hover:bg-violet-100/80 dark:bg-violet-800 dark:text-violet-50 dark:hover:bg-violet-800/80 mx-1 font-semibold uppercase'>
							Free
						</div>
						&nbsp;plan for&nhsp;
						<p className='inline font-semibold'>free forever</p>
					</div>

					<div className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full mb-4 mt-4'></div>

					<div className='flex flex-col gap-1 rounded-md py-1'>
						<BillingDetailItems text='20 messages credits/month' />
						<BillingDetailItems text='1 chatbot' />
						<BillingDetailItems text='400,000 characters/chatbot' />
						<BillingDetailItems text='Limit to 10 links to train on' />
						<BillingDetailItems text='Embed on unlimited websites' />
						<BillingDetailItems text='View chat history' />
					</div>

					<div className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] mb-6 w-full mt-4'></div>
					<div className='p-6 pt-0 flex w-full items-center justify-end gap-2'>
						<Button>Manage Subscriptions</Button>
					</div>
				</div>
			</div>

			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Usuage</h3>
				</div>
				<div className='p-6 pt-0'>
					<div className='flex flex-col gap-2 whitespace-normal'>
						<p>Messages consumed:<b>&nbsp8/20</b></p>
						<p>Your credits renew at the start of every calendar month.</p>
						<p>Next renewal: <b>Auguest 1st</b></p>
					</div>
				</div>
			</div>

			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
				<div className='flex flex-col space-y-1.5 p-6 font-bold'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Billing Details</h3>
				</div>
				<div className='p-6 pt-0 flex flex-col'>
					<form action="" className='flex flex-col gap-4'>
						We will add the stopElement heree
					</form>
					<div className='flex justify-end gap-2'>
						<Button>Save</Button>
					</div>
				</div>
			</div>

			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
				<div className='flex flex-col space-y-1.5 p-6 font-bold'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Billing Email </h3>
				</div>
				<div className='p-6 pt-0'>
					<p className='text-zinc-500 dark:text-zinc-400 ml-1 text-sm whitespace-normal mb-3'>
						By default, all invoices will be sent to the email address of the team&apos;s creator. If you prefer to use a different email address for receiving invoices, please enter it here.
					</p>

					<form action="" id='update-billing-email-form'>
						<div className='space-y-2'>
							<Input placeholder='Enter your email' maxLength={255} />
						</div>
						<div className='mt-6 flex justify-end'>
							<Button>Save</Button>
						</div>
					</form>
				</div>
			</div>

			<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50'>
				<div className='flex flex-col space-y-1.5 p-6 font-bold'>
					<h3 className='text-2xl font-semibold leading-none tracking-tight'>Tax ID</h3>
				</div>
				<div className='p-6 pt-0 flex flex-col gap-6'>
					<p className='text-sm text-zinc-500 dark:text-zinc-400 ml-1 whitespace-normal'>
						If you want your upcoming invoices to display a specific tax ID, please enter it here.
					</p>
					<form action="" className='flex flex-col items-end gap-4'>
						<div className='flex w-full flex-col gap-6'>
							<div className='grid w-full items-center gap-1.5'>
								<label htmlFor="" className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1 ml-1'>
									Tax type
								</label>
								<div className='space-y-2'>
									<Select defaultValue='none'>
										<SelectTrigger className="w-full">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="private">Australia - AU ABN</SelectItem>
											<SelectItem value="public">Australia - AU ARN</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='space-y-2 grid w-full items-center gap-1'>
								<label htmlFor="" className='class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1"'>ID</label>
								<Input disabled placeholder='N/A' />
							</div>

							<div className='flex justify-end gap-2'>
                <Button>Save</Button>
              </div>
						</div>
					</form>
				</div>
			</div>


		</section>
	)
}

export default SettingBillingMainView