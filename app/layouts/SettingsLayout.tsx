import SettingSidebar from "@/components/dashboard/setting/SettingSidebar";

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" w-full max-w-7xl px-4 lg:mx-auto py-20">
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
