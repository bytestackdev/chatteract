import React from 'react'
import { Skeleton } from './skeleton'

const CustomSkeleton = () => {
	return (
		<>
			<div className="flex flex-col space-y-3">
				<Skeleton className="h-[125px] w-full rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[300px]" />
				</div>
			</div>
			<div className="flex flex-col space-y-3 mt-5">
				<Skeleton className="h-[125px] w-full rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[300px]" />
				</div>
			</div>
		</>
	)
}

export default CustomSkeleton