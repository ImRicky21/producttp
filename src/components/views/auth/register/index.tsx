import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
      setLoading(false);
      Swal.fire("Success", "Register Success", "success");
    } else {
      setLoading(false);
      setError("email atau username sudah ada");
      Swal.fire("Error", "Something went wrong", "error");
      console.log("error");
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
          <Input label="email" name="email" type="email" placeholder="Email" />
          <Input
            label="fullname"
            name="fullname"
            type="fullname"
            placeholder="Fullname"
          />
          <Input label="phone" name="phone" type="phone" placeholder="Phone" />
          <Input
            label="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" onClick={() => handleSubmit}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <div>
        <a href="login">Log in</a>
      </div>
    </div>
  );
};
export default RegisterView;
