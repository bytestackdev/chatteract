import DataSources from "@/components/dashboard/CreateNewChatBot/DataSources";
import Sidebar from "@/components/dashboard/CreateNewChatBot/Sidebar";

export default function CreateNewChatBotLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" w-full max-w-7xl px-4 lg:mx-auto py-20">
			<div className=" flex flex-col items-center justify-center mb-10">
				<h1 className=" text-3xl font-semibold">Data Sources</h1>
				<p className=" mt-1 text-gray-500">Add your data sources to train your chatbot</p>
			</div>
			<div className=" flex flex-row gap-2">
				<Sidebar />
				<div className="flex-1">
					<div className="flex flex-col align-top lg:flex-row lg:space-x-8 lg:align-middle">
						<div className="lg:w-4/6">
							{children}
						</div>
						<div className="m-auto my-4 w-full lg:my-0 lg:w-2/6">
							<DataSources />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
