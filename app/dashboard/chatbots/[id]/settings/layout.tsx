import ConnectLayout from "@/app/layouts/chatbots/Connect/ConnectLayout";
import SettingLayout from "@/app/layouts/chatbots/Setting/SettingLayout";

export default async function RootSettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className='mx-auto flex max-w-7xl flex-row justify-between px-4'>
				<h4 className='my-6 text-3xl font-bold'>Settings</h4>
			</div>
			<SettingLayout>
				{children}
			</SettingLayout>
		</>
	);
}
