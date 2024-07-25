'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import LoadingWrapper from '../ui/LoadingWrapper'

interface WaitlistFormState {
	name: string;
	email: string;
	number: string | undefined;
}

const formDefaultState = {
	name: '',
	email: '',
	number: undefined,
}

const WaitListMainView: React.FC = () => {
	const [formState, setFormState] = useState<WaitlistFormState>(formDefaultState);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormState(prevState => ({
			...prevState,
			[id]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true)
			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formState),
			});

			if (response.ok) {
				toast.success('You have been added to the waitlist!');
				setIsOpen(false);
				setFormState(formDefaultState)
			} else {
				const errorData = await response.json();
				toast.error(errorData.error || 'There was an error. Please try again.');
			}
		} catch (error: any) {
			console.error('Submission Error:', error);
			toast.error('There was an unexpected error. Please try again.');
		} finally {
			setLoading(false)
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" onClick={() => setIsOpen(true)}>Join the Waiting List</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[400px] md:max-w-[500px]">
				<LoadingWrapper loading={loading}>
					<DialogHeader>
						<DialogTitle>Join the Wait List</DialogTitle>
						<DialogDescription>
							Enter your details below to join our waiting list. Save your changes to complete the process.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								placeholder="Pedro Duarte"
								className="col-span-3"
								value={formState.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								placeholder='example@example.com'
								className="col-span-3"
								type='email'
								value={formState.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="number" className="text-right leading-5 flex flex-col">
								Phone Number
								<span className=' text-xs text-slate-600'>(Optional)</span>
							</Label>
							<PhoneInput
								containerClass='col-span-3'
								inputClass='!w-full'
								country={'us'}
								value={formState.number}
								onChange={(value) => setFormState(prevState => ({ ...prevState, number: value }))}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</LoadingWrapper>
			</DialogContent>
		</Dialog>
	);
}

export default WaitListMainView;
