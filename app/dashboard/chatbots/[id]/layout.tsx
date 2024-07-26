import ChatbotTabs from "@/components/dashboard/tabs/ChatbotTabs";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<>
			<ChatbotTabs />
			<div>
				{children}
			</div>
		</>
	);
}
