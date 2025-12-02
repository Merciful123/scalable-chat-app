import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12  bg-gradient-to from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Instant Chat Links for Seamless Conversations
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        QuickChat makes it effortless to create secure chat links and start
        conversations in seconds.
      </p>
      <Link href="/dashboard">
        <div className="chrome-ai-glow rounded-full">
          <div className="gradient-and-mask-wrapper">
            <div className="outer-glow"></div>
            <div className="rotating-gradient"></div>
            <div className="rotating-mask"></div>
          </div>
          <Button size="lg" className="relative z-10 cursor-pointer">
            Start Chatting
          </Button>
        </div>
      </Link>

      <div className="mt-12 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <Image
          src="/images/conversation.svg"
          alt="Illustration"
          className="w-full h-auto"
          width={1}
          height={1}
          loading="eager"
        />
      </div>
    </section>
  );
}