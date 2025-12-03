"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginModal = () => {

  const handleLogin = () =>{
    signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true
    })
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"  className="cursor-pointer *:cursor-pointer">Getting Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to QuickChat</DialogTitle>
            <DialogDescription>
              QuickChat makes it effortless to create secure chat links and
              start conversations in seconds.
            </DialogDescription>
          </DialogHeader>
          <Button variant={"outline"} onClick={handleLogin}>
            <Image
              src={"/images/google.png"}
              width="25"
              height={"25"}
              alt="google_logo"
              className="cursor-pointer"
            />
            Continue with Google
          </Button>
          <div className="grid gap-4">
            {/* commented this to keep google login only */}
            
            {/* <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
