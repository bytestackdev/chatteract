import React from 'react'
import { MembersTable } from './MembersTable'
import { Button } from '@/components/ui/button'

const MembersMainView = () => {
	return (
		<div className=' p-8 border border-gray-200 rounded-lg'>
			<h2 className=' text-2xl font-semibold mb-5 '>Members</h2>
			<div>
				<MembersTable />
				<div className=' flex justify-end mt-5'>
					<Button>Invite members</Button>
				</div>
			</div>
		</div>
	)
}

export default MembersMainView