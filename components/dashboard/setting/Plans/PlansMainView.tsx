import React from 'react'
import PlanCard from './PlanCard'
import { PlanCardType } from '@/types/type'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const PlansMainView = () => {

	const planCardsData: PlanCardType[] = [
		{
			title: 'Hobby',
			price: '19',
			per: 'Per Month',
			showPerChangeHandler: false,
			description: {
				title: 'Everything in Free, plus...',
				details: [
					'2,000 message credits/month',
					'2 chatbots',
					'11,000,000 characters/chatbot',
					'Unlimited links to train on',
					'API access',
					'Integrations'
				]
			},
			btnVariant: 'outline',
		},
		{
			title: 'Standard',
			price: '99',
			per: 'Per Month',
			showPerChangeHandler: false,
			description: {
				title: 'Everything in Hobby, plus...',
				details: [
					'10,000 message credits/month',
					'5 chatbots',
					'3 team members',
					'Option to choose GPT-4 and GPT-4-Turbo',
				]
			},
			btnVariant: 'default',
		},
		{
			title: 'Unlimited',
			price: '399',
			per: 'Per Month',
			showPerChangeHandler: false,
			description: {
				title: 'Everything in Standard, plus...',
				details: [
					'40,000 message credits/month included (Messages over the limit will use your OpenAI API Key)',
					'10 chatbots',
					'5 team members',
					"Remove 'Powered by Chatbase'",
					'Use your own custom domains'
				]
			},
			btnVariant: 'outline',
		}
	]

	return (
		<>
			<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{planCardsData.map((card, index) => (
					<PlanCard key={index} planCardData={card} />
				))}
			</div>
			<div className='flex flex-col gap-10 mt-10'>
				<div>
					<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 relative'>
						<div className='flex flex-col space-y-1.5 p-6'>
							<h3 className='text-2xl font-semibold leading-none tracking-tight'>Extra Message credits</h3>
						</div>
						<div data-orientation="horizontal" role='none' className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full mb-4'></div>
						<div className='p-6 pt-0'>
							<div className='flex justify-between'>
								<div>
									<div className='flex flex-col'>
										<span className='text-lg font-semibold text-zinc-950'>$7 per 1000  messages / month</span>
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center p-6 px-6 py-3'>
							<div className='mr-2 flex items-center gap-2 text-sm'>
								<Switch id="" />
								<Label>Disabled</Label>
							</div>
						</div>
					</div>
				</div>

				{/* Extra Chatbots */}
				<div>
					<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 relative'>
						<div className='flex flex-col space-y-1.5 p-6'>
							<h3 className='text-2xl font-semibold leading-none tracking-tight'>Extra Chatbots</h3>
						</div>
						<div data-orientation="horizontal" role='none' className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full mb-4'></div>
						<div className='p-6 pt-0'>
							<div className='flex justify-between'>
								<div>
									<div className='flex flex-col'>
										<span className='text-lg font-semibold text-zinc-950'>$7 per chatbot / month</span>
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center p-6 px-6 py-3'>
							<div className='mr-2 flex items-center gap-2 text-sm'>
								<Switch id="" />
								<Label>Disabled</Label>
							</div>
						</div>
					</div>
				</div>


				{/* Custom Domains */}
				<div>
					<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 relative'>
						<div className='flex flex-col space-y-1.5 p-6'>
							<h3 className='text-2xl font-semibold leading-none tracking-tight'>Custom Domains</h3>
						</div>
						<div data-orientation="horizontal" role='none' className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full mb-4'></div>
						<div className='p-6 pt-0'>
							<div className='flex justify-between'>
								<div>
									<div className='flex flex-col'>
										<span className='text-lg font-semibold text-zinc-950'>$59 / month</span>
									</div>
									<div className='text-zinc-500'>Use your own custom domains for the embed script, iframe, and chatbot link</div>
								</div>
							</div>
						</div>
						<div className='flex items-center p-6 px-6 py-3'>
							<div className='mr-2 flex items-center gap-2 text-sm'>
								<Switch id="" />
								<Label>Disabled</Label>
							</div>
						</div>
					</div>
				</div>


				{/* Remove 'Powered By Chatbase' */}
				<div>
					<div className='rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 relative'>
						<div className='flex flex-col space-y-1.5 p-6'>
							<h3 className='text-2xl font-semibold leading-none tracking-tight'>Remove &apos;Powered By Chatbase&apos;</h3>
						</div>
						<div data-orientation="horizontal" role='none' className='shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full mb-4'></div>
						<div className='p-6 pt-0'>
							<div className='flex justify-between'>
								<div>
									<div className='flex flex-col'>
										<span className='text-lg font-semibold text-zinc-950'>$39 / month</span>
									</div>
									<div className='text-zinc-500'>Remove the Chatbase branding from the iframe and widget</div>
								</div>
							</div>
						</div>
						<div className='flex items-center p-6 px-6 py-3'>
							<div className='mr-2 flex items-center gap-2 text-sm'>
								<Switch id="" />
								<Label>Disabled</Label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PlansMainView