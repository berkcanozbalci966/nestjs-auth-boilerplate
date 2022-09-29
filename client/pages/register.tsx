import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Login as LoginType } from "../types/auth.type";
import AuthService from "../services/auth.service";
import AuthContext from "../context/AuthProvider";
import WithSecureLayout from "../layouts/withSecureLayout";
import { TextInput, Label, Checkbox, Button } from "flowbite-react";

const authService = new AuthService();

const schema = yup
  .object({
    usernameOrEmail: yup.string().required(),
    password: yup.string().required(),
    passwordRepeat: yup.string().required(),
  })
  .required();

function Register() {
  const { setAuth, auth } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(event: LoginType) {
    try {
      const response = await authService.loginRequest(event);

      setTimeout(() => {
        router.push("/");
      }, 1000);

      console.log(response);
    } catch (error) {
      setAuth((prev: any) => {
        return { ...prev, name: "Error" };
      });
    }
  }

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5 mb-5">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center"> Register Page </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              placeholder="name@flowbite.com"
              {...register("usernameOrEmail")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              type="password"
              shadow={true}
              {...register("password")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              type="password"
              shadow={true}
              {...register("password2")}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the{" "}
              <a
                href="/forms"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </Label>
          </div>
          <Button type="submit">Register new account</Button>
        </form>
      </div>
    </div>
  );
}

export default WithSecureLayout(Register);
