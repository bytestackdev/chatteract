import CreateNewChatBotLayout from "@/app/layouts/CreateNewChatBotLayout";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CreateNewChatBotLayout>{children}</CreateNewChatBotLayout>
	);
}
