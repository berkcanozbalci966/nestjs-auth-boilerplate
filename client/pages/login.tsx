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
  })
  .required();

function Register() {
  const { setAuth, auth, setUser } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(event: LoginType) {
    try {
      authService.login(event).then((response: any) => {
        const { user, ...authInfo } = response;

        setAuth((prev: any) => ({ ...prev, ...authInfo }));

        setUser((prev: any) => ({ ...prev, ...user }));

        router.push("/");

        console.log(response);
      });
    } catch (error) {
      setAuth((prev: any) => {
        return { ...prev, name: "Error" };
      });
    }
  }

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5 mb-5">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center"> Login Page </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email or username" />
            </div>
            <TextInput id="email2" {...register("usernameOrEmail")} />
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default WithSecureLayout(Register);
