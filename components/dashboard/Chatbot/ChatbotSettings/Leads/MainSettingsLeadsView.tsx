'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import React, { useState } from 'react'

const MainSettingsLeadsView = () => {

	const [nameInputShow, setNameInputShow] = useState(false)
	const [emailInputShow, setEmailInput] = useState(false)
	const [phoneInputShow, setPhoneInputShow] = useState(false)

	const handleNameSwitchChange = (value: string) => {
		if (value === 'name') {
			setNameInputShow(!nameInputShow)
		} else if (value === 'email') {
			setEmailInput(!emailInputShow)
		} else if (value === 'phone') {
			setPhoneInputShow(!phoneInputShow)
		}
	}

	return (
		<div className='mb-16 rounded-md border border-zinc-200 space-y-1 p-2'>
			<div className=' border-zinc-200 px-5 py-4'>
				<h3 className='text-2xl font-semibold leading-6 text-zinc-900 '>Leads</h3>
			</div>
			<div className='p-5'>
				<div className='pb-4'>
					<div className=' flex w-full flex-col '>
						<h4 className='mb-4 text-sm text-zinc-600'>Note: Leads form only appears when chatting through the iframe or the chat bubble.</h4>
						<div className='flex flex-col gap-2 py-4'>
							<label htmlFor="" className='text-md block font-semibold'>Title</label>
							<div className='flex gap-5'>
								<Input placeholder='Enter the title' />
								<Button variant={'secondary'}>Reset</Button>
							</div>
						</div>


						<div className={`flex flex-col gap-2 py-5 ${nameInputShow ? 'border-none' : 'border-b '}`}>
							<div className=' flex flex-row items-center justify-between '>
								<label htmlFor="" className='text-md block pb-2 font-medium text-zinc-700'>Name</label>
								<Switch onClick={() => handleNameSwitchChange('name')} />
							</div>

							{nameInputShow && <div className='flex gap-5 mt-2'>
								<Input placeholder='Enter the title' />
								<Button variant={'secondary'}>Reset</Button>
							</div>}
						</div>


						<div className={`flex flex-col gap-2 py-5 ${nameInputShow ? 'border-none' : 'border-b '}`}>
							<div className=' flex flex-row items-center justify-between '>
								<label htmlFor="" className='text-md block pb-2 font-medium text-zinc-700'>Email</label>
								<Switch onClick={() => handleNameSwitchChange('email')} />
							</div>

							{emailInputShow && <div className='flex gap-5 mt-2'>
								<Input placeholder='Enter the title' />
								<Button variant={'secondary'}>Reset</Button>
							</div>}
						</div>

						<div className={`flex flex-col gap-2 py-5 ${nameInputShow ? 'border-none' : 'border-b '}`}>
							<div className=' flex flex-row items-center justify-between '>
								<label htmlFor="" className='text-md block pb-2 font-medium text-zinc-700'>Phone</label>
								<Switch onClick={() => handleNameSwitchChange('phone')} />
							</div>

							{phoneInputShow && <div className='flex gap-5 mt-2'>
								<Input placeholder='Enter the title' />
								<Button variant={'secondary'}>Reset</Button>
							</div>}
						</div>

						{/* show input for phone on switch */}

					</div>
				</div>
			</div>
		</div>
	)
}

export default MainSettingsLeadsView