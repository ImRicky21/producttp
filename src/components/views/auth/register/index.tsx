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
            <label htmlFor="fullname">fullname</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="border-2 focus:border-cyan-400 focus:outline-none rounded-md p-1 "
            />
          </div>
          <div className="grid grid-cols-1">
            <label htmlFor="phone">phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
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
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterView;
