import SettingSidebar from "@/components/dashboard/setting/SettingSidebar";
import ConnectSidebar from "./ConnectSidebar";

export default function ConnectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" w-full max-w-7xl px-4 lg:mx-auto">
			<div className=" flex flex-row gap-2">
				<ConnectSidebar />
				<div className="flex-1">
					<div className="">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
