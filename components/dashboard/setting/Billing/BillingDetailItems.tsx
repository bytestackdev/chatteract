import React from 'react'

interface BillingDetailItemsProps {
	text: string;
}

const BillingDetailItems: React.FC<BillingDetailItemsProps> = ({ text }) => {
	return (
		<div className='flex items-center gap-2 text-sm'>
			<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check h-5 w-5 fill-green-500 text-white" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg></span>
			<span>{text}</span>
		</div>
	)
}

export default BillingDetailItems