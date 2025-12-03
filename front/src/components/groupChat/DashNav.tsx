"use client";
import Link from "next/link";
import ProfileMenu from "../auth/ProfileMenu";

export default function DashNav({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <nav className="py-2 px-6 flex justify-between items-center bg-white shadow-sm">
      <Link href={"/"}>
        <h1 className="text-xl md:text-2xl font-extrabold bg-linear-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">QuickChat</h1>
      </Link>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700 ">
        <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  );
}
