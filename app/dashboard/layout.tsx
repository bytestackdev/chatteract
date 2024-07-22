import Header from "@/components/header/Header";
import { Navigation } from "@/components/header/Navigation";
import AuthButton from "@/components/WebUI/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  return (
    <>
      <Header isLoggedIn={true} />
      {children}
    </>
  );
}
