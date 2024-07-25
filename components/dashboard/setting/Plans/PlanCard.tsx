import { Button } from '@/components/ui/button'
import { PlanCardType } from '@/types/type'
import React from 'react'

interface PlanCardProps {
	planCardData: PlanCardType
}

const PlanCard: React.FC<PlanCardProps> = ({ planCardData }) => {
	return (
		<div className='border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 relative flex flex-col justify-between rounded-xl p-6'>
			<div className='flex flex-col gap-3 justify-between h-full'>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col space-y-1.5 p-0'>
						<h3 className='text-2xl leading-none tracking-tight font-medium'>{planCardData.title}</h3>
					</div>
					<div className='flex flex-col gap-3 p-0'>
						<div className='flex flex-col gap-1'>
							<span className='text-5xl font-semibold'>
								<p className='inline-block text-3xl font-normal'>$</p>
								{planCardData.price}
							</span>
							<div className='flex flex-row items-end justify-between h-10'>
								<span className='text-zinc-500'>{planCardData.per}</span>
								{planCardData.showPerChangeHandler && <span>
									Montly/Yearly
								</span>}
							</div>
						</div>
						<div data-orientation="horizontal" role="none" className="shrink-0 dark:bg-zinc-500 h-[1px] w-full bg-zinc-300"></div>
						<ul className='mt-4 flex flex-col gap-4 text-sm font-medium'>

							<div className='flex flex-row gap-1'>
								<span className='text-sm font-semibold'>{planCardData.description.title}</span>
							</div>

							{
								planCardData.description.details.map((detail, index) => (
									<li key={index} className='flex flex-row items-start gap-3'>
										<p className='size-5 text-zinc-700'>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check size-5"><path d="M20 6 9 17l-5-5"></path></svg>
										</p>
										<span>{detail}</span>
									</li>
								))
							}

						</ul>
					</div>
				</div>

				<div className='mt-6'>
					<Button variant={planCardData.btnVariant} className=' w-full'>Upgrade</Button>
				</div>
			</div>
		</div>
	)
}

export default PlanCard