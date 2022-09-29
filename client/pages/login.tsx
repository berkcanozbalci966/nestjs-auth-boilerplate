import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../layouts/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { Login as LoginType } from "../types/auth.type";
import AuthService from "../services/auth.service";
import AuthContext from "../context/AuthProvider";
import WithSecureLayout from "../layouts/withSecureLayout";

const authService = new AuthService();

const schema = yup
  .object({
    usernameOrEmail: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const { setAuth, auth } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(event: LoginType) {
    try {
      const response = await authService.loginRequest(event);
      setAuth((prev: any) => {
        return { ...prev, ...response };
      });

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
        <h1 className="mb-8 text-3xl text-center"> Login Page </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("usernameOrEmail")}
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            placeholder="Username or email"
          />
          <p className="mt-2"></p>
          <input
            {...register("password")}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            placeholder="password"
          />{" "}
          <button
            type="submit"
            className="w-full text-center py-3 rounded btn btn-info text-white mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default WithSecureLayout(Login);
