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
      <div className=" flex flex-row justify-between items-center p-10">
        <div>
          <p className=" font-semibold">BYTESTACK.AI</p>
        </div>
        <div>
          <Navigation />
        </div>
        {<AuthButton />}
      </div>
      {children}
    </>
  );
}
