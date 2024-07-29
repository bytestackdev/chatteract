import SourcesLayout from "@/app/layouts/chatbots/Sources/SourcesLayout";

export default async function RootSettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='mx-auto flex max-w-7xl flex-row justify-between px-4'>
				<h4 className='my-6 text-3xl font-bold'>Sources</h4>
			</div>
			<SourcesLayout>
				{children}
			</SourcesLayout>
		</>
	);
}
