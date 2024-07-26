import SettingsLayout from "@/app/layouts/SettingsLayout";
import Tabs from "@/components/dashboard/tabs/tabs";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Tabs />
			<SettingsLayout>
				{children}
			</SettingsLayout>
		</>
	);
}
