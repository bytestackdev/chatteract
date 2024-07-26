import SettingSidebar from "./SettingSidebar";

export default function SettingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" w-full max-w-7xl px-4 lg:mx-auto">
			<div className=" flex flex-row gap-2">
				<SettingSidebar />
				<div className="flex-1">
					<div className="">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
