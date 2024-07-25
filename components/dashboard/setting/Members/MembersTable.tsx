'use client'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { BsThreeDotsVertical } from "react-icons/bs";


const users = [
	{
		id: '1',
		email: "ahmad.amin@khired.com",
		memberSince: "Jul 24, 2024",
		role: "Owner",
	},
]

export function MembersTable() {

	const handleClick = () => {
		console.log('click')
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>User</TableHead>
					<TableHead className=" w-[150px]">Member since</TableHead>
					<TableHead className=" w-[100px]">Role</TableHead>
					<TableHead className="text-right"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell className="font-medium">{user.email}</TableCell>
						<TableCell>{user.memberSince}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end">
								<BsThreeDotsVertical onClick={handleClick} className=" cursor-pointer" fontSize={'20px'} />
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
