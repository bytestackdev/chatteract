import React from 'react'
import { Spinner } from '../extension/Spinner'

interface LoadingWrapperProps {
	loading: boolean
	children: React.ReactNode
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ loading, children }) => {
	return (
		<div style={{ position: 'relative' }}>
			{loading && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 999,
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
					}}
				>
					<Spinner size="small" />
				</div>
			)}
			<div style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.3s' }}>
				{children}
			</div>
		</div>
	)
}

export default LoadingWrapper