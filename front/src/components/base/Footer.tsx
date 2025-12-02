import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {

  return (
  
  <footer className="p-6 bg-gray-900 text-white lg:px-10">
      <div className="flex justify-between">
        <div>
          <div>© 2024 QuickChat. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Subscribe to our newsletter"
            className="bg-gray-800 border-none"
          />
          <Button className="cursor-pointer">Subscribe</Button>
        </div>
      </div>
  </footer>
  );
}