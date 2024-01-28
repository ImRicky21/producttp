import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
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
      <h1>Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <form
          onSubmit={handleSubmit}
          className="item-center grid grid-cols-1 gap-5"
        >
          <Input label="email" name="email" type="email" />
          <Input label="password" name="password" type="password" />
          <Button
            type="submit"
            onClick={() => push(callbackUrl)}
            className="bg-sky-400 p-2 rounded-md"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
      <hr className="border-2" />
      <div>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          login with google
        </Button>
      </div>
      <div>
        <a href="register">register</a>
      </div>
    </div>
  );
};
export default LoginView;
