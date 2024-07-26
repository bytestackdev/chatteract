import ConnectLayout from "@/app/layouts/chatbots/Connect/ConnectLayout";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='mx-auto flex max-w-7xl flex-row justify-between px-4'>
				<h4 className='my-6 text-3xl font-bold'>Connect</h4>
			</div>
			<ConnectLayout>
				{children}
			</ConnectLayout>
		</>
	);
}
