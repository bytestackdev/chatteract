import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Navigation } from './Navigation'
import AuthButton from '../WebUI/AuthButton'

interface HeaderProps {
	isLoggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
	return (
		<>
			<div className=" flex flex-row justify-between items-center p-4 md:p-10">
				<div className=" flex flex-row gap-2 items-center">
					<div className=" block md:hidden">
						<FaBars />
					</div>
					<p className=" font-semibold">BYTESTACK.AI</p>
				</div>
				<div className=" hidden md:block">
					<Navigation />
				</div>
				{isLoggedIn && <AuthButton />}
			</div>
			<div className=" block md:hidden p-4">
				<Navigation />
			</div>
		</>
	)
}

export default Header