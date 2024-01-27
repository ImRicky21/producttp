import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const LoginView = () => {
  const { push, query } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("email or password incorrect");
      }
    } catch (error) {
      setLoading(false);
      setError("email or password incorrect");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center p-4 m-6 border-2 ">
      <h1>Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <form
          onSubmit={handleSubmit}
          className="item-center grid grid-cols-1 gap-5"
        >
          <div className="grid grid-cols-1">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 "
            />
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 "
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-300 rounded-md p-1 hover:bg-cyan-500 transition ease-in-out"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginView;
