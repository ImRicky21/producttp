import Button from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const lists = [];
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-items-end p-3 bg-slate-500">
      <div>
        <Link href={"/"}>Profil</Link>
      </div>
      <div></div>
      <div></div>
      <div className="">
        <Button
          type="button"
          className="bg-cyan-300 rounded-md p-1 hover:bg-cyan-500 transition ease-in-out"
          onClick={() => (data ? signOut() : signIn())}
        >
          {data ? "log out" : "log in"}
        </Button>
      </div>
    </nav>
  );
}
