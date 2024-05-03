import AuthLayout from "@/components/layout/authLayout";
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
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in!",
        });
      } else {
        setLoading(false);
        setError("email or password incorrect");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Email or password incorrect",
        });
      }
    } catch (error) {
      setLoading(false);
      setError("email or password incorrect");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Email or password incorrect",
      });
    }
  };

  return (
    <AuthLayout
      error={error}
      title="Login"
      link="/auth/register"
      linkText="register"
    >
      <div className="item-center grid-cols-1 justify-center">
        <form
          onSubmit={handleSubmit}
          className="item-center grid grid-cols-1 gap-10"
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
    </AuthLayout>
  );
};
export default LoginView;
