import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <div className="flex justify-items-end p-3 bg-slate-500">
      <button
        className="bg-cyan-300 rounded-md p-1 hover:bg-cyan-500 transition ease-in-out"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "log out" : "log in"}
      </button>
    </div>
  );
}
