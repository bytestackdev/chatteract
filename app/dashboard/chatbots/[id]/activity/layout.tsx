import ActivityLayout from "@/app/layouts/chatbots/Activity/ActivityLayout";
import ConnectLayout from "@/app/layouts/chatbots/Connect/ConnectLayout";

export default async function RootActivityLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='mx-auto flex max-w-7xl flex-row justify-between px-4'>
				<h4 className='my-6 text-3xl font-bold'>Activty</h4>
			</div>
			<ActivityLayout>
				{children}
			</ActivityLayout>
		</>
	);
}
