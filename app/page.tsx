import Header from "@/components/header/Header";
import { Navigation } from "@/components/header/Navigation";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { Button } from "@/components/ui/button"
import AuthButton from "@/components/WebUI/AuthButton";
import Features from "@/components/WebUI/Features";
import Footer from "@/components/WebUI/Footer";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default async function HomePage() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div className="">
      <Header isLoggedIn={isSupabaseConnected} />
      <div className=" grid grid-cols-1 md:grid-cols-2 p-10 md:px-20 mb-10 ">
        <div className=" my-24">
          <p className=" text-3xl lg:text-7xl font-bold mb-10">Custom AI Analytics for your website</p>
          <p className=" text-lg mb-10">Build a custom GPt, embed it on your website and let it handle customer support, lead generation, engage with your users, and more</p>
          <div className=" mt-10 flex flex-row gap-5">
            <div className=" flex flex-col items-center gap-2">
              <Button variant="default" size='lg'>Get Started</Button>
              <p className=" text-xs text-slate-600">No credit card required</p>
            </div>
            <Button variant="ghost" size='lg'>Watch Video</Button>
          </div>
        </div>
        <div></div>
      </div>

      <div className=" bg-zinc-950 p-10 mb-10">
        <p className=" text-slate-200 text-center">Trusted by 5000+ business</p>
        <div className=" flex flex-row gap-2 items-center justify-center mt-10 flex-wrap">
          <Image src={'/bus1.webp'} width={100} height={100} alt="Business Logo 1" />
          <Image src={'/bus2.webp'} width={100} height={100} alt="Business Logo 2" />
          <Image src={'/bus3.webp'} width={100} height={100} alt="Business Logo 3" />
          <Image src={'/bus4.webp'} width={100} height={100} alt="Business Logo 4" />
          <Image src={'/bus5.webp'} width={100} height={100} alt="Business Logo 5" />
        </div>
      </div>


      <div className=" my-20 p-10 md:px-20">
        <div className="">
          <HowItWorks />
        </div>
      </div>

      <div className="my-10 p-10 md:px-20">
        <Features />
      </div>


      <div className="my-10 p-10 md:px-20">
        <div className=" grid grid-cols-1 md:grid-cols-2 md:p-20 gap-10 md:gap-0">
          <div className=" flex flex-col justify-center gap-3 w-10/12">
            <div className=" mb-5">
              <p className="uppercase text-base text-purple-600 font-bold">Quick to setup</p>
              <p className="text-2xl md:text-4xl font-semibold mt-5">A dedicated landing page</p>
            </div>
            <p className=" text-slate-500 text-base md:text-lg">Create a dedicated landing page for you business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes</p>
            <div className=" mt-5">
              <Button size={'lg'}>Try it for Free</Button>
            </div>
          </div>
          <div className="md:p-10">
            <Image src={'/landing-page.png'} alt="Landing Page" width={100} height={100} className=" w-full h-full" unoptimized />
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 md:p-20 gap-10 md:gap-0 mt-10">
          <div className="md:p-10">
            <Image src={'/easy-to-manage.png'} alt="Landing Page" width={100} height={100} className=" w-full h-full" unoptimized />
          </div>
          <div className=" flex flex-col justify-center gap-3 md:w-10/12 ml-auto">
            <div className=" mb-5">
              <p className="uppercase text-base text-purple-600 font-bold">Easy to manage</p>
              <p className="text-2xl md:text-4xl font-semibold mt-5">A dashboard to manage all testimonials and data</p>
            </div>
            <p className=" text-slate-500 text-base md:text-lg">You will have a simple & clean dashboard to manage all testimonials and data in one place. it&apos;s like your email inbox, but it&apos;s designed for your social proof!</p>
            <div className=" mt-5">
              <Button size={'lg'}>Try it for Free</Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-zinc-950 py-12 md:p-12">
        <div className=" bg-zinc-700 w-11/12 md:w-8/12 mx-auto p-20 rounded-xl flex flex-col justify-center items-center gap-10">
          <p className=" text-white text-center text-3xl font-semibold"> Join the future of AI chatbots today</p>
          <Button size={'lg'} variant={'secondary'}>Try for Free</Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
