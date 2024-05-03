import AuthLayout from "@/components/layout/authLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import authService from "@/services/auth/index";
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

    if (
      !form.email.value ||
      !form.fullname.value ||
      !form.phone.value ||
      !form.password.value
    ) {
      setLoading(false);
      Swal.fire("error", "Please fill all the fields", "error");
      return;
    }
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authService.registerAccount(data);

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
    <AuthLayout title="Register" link="/auth/login" linkText="Login">
      <div>
        <form
          onSubmit={handleSubmit}
          className="item-center grid grid-cols-1 gap-10"
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
          <Button
            type="submit"
            onClick={() => handleSubmit}
            className="bg-sky-400 rounded-lg"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};
export default RegisterView;
