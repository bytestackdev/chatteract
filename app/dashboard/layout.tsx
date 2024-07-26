import Tabs from "@/components/dashboard/tabs/tabs";
import Header from "@/components/header/Header";
import DashboardLayout from "../layouts/DashboardLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header isLoggedIn={true} />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
