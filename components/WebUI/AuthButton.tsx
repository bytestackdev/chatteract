import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <p className=" text-xs text-slate-500">Hey, {user.email}!</p>
      <form action={signOut}>
        <Button variant={'default'}>
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      <Button variant={'outline'} size={'sm'}>Login</Button>
    </Link>
  );
}
