import { ReactElement } from "react";
import Layout from "../layouts/layout";
import useFetch from "../hooks/useFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HttpClient from "../utils/http-client";

import { useRouter } from "next/router";
import { Login as LoginType } from "../types/auth.type";

const httpClient = new HttpClient();
const schema = yup
  .object({
    usernameOrEmail: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function sendLoginRequest(data: LoginType) {
    const requestObject = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    };
    return await httpClient.post("/auth/login", requestObject);
  }

  async function onSubmit(event: LoginType) {
    try {
      const response = await sendLoginRequest(event);
      console.log(response);
    } catch (error) {}
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

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Login;
