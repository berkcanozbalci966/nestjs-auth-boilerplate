import { ReactElement } from "react";
import Layout from "../layouts/layout";
import useFetch from "../hooks/useFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();
const schema = yup
  .object({
    firstName: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  // const { data, error } = useFetch("/auth/profile", "get");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function sendLoginRequest(data: any) {
    const requestObject = {
      usernameOrEmail: data.firstName,
      password: data.password,
    };
    httpClient.post("/auth/login", requestObject);
  }

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5 mb-5">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center"> Login Page </h1>
        <form onSubmit={handleSubmit(sendLoginRequest)}>
          <input
            {...register("firstName")}
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
