import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import WithSecureLayout from "../layouts/withSecureLayout";
import AuthContext from "../context/AuthProvider";
import AuthService from "../services/auth.service";

import { yupResolver } from "@hookform/resolvers/yup";
import AlertComponent from "../components/form/alert";
import { RegisterSchema } from "../validations/register.schema";
import Link from "next/link";

const authService = new AuthService();

function RegisterPage() {
  const { setAuth, auth, setUser } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  async function onSubmit(event: any) {
    try {
      const { passwordRepeat, ...dataWithoutRepeatedPassword } = event;

      const response: any = await authService.register(
        dataWithoutRepeatedPassword
      );

      setUser((prev: any) => ({ ...prev, ...response.user }));

      router.push("/");

      console.log(response);
    } catch (error) {
      setAuth((prev: any) => {
        return { ...prev, name: "Error" };
      });
    }
  }

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center"> {"Register"}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            {...register("name")}
            placeholder="Name"
          />
          {errors.name && <AlertComponent message="Name error!" />}

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("surname")}
            placeholder="Surname"
          />
          {errors.surname && <AlertComponent message="Surname error!" />}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("username")}
            placeholder="username"
          />
          {errors.username && <AlertComponent message="UserName error!" />}

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <AlertComponent message="Email error!" />}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("password")}
            placeholder="password"
          />
          {errors.password && <AlertComponent message="Password error!" />}
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("passwordRepeat")}
            placeholder="Tekrar pass"
          />
          {errors.passwordRepeat && (
            <AlertComponent message="Password again!" />
          )}

          <button
            type="submit"
            className="w-full text-center py-3 rounded btn btn-info text-white mt-4"
          >
            "Kayıt ol"
          </button>
        </form>
      </div>

      <div className="text-grey-dark mt-6">
        "Hesabın zaten var mı gardaş?"
        <Link href={{ pathname: "/login" }}>
          <a className="no-underline border-b border-blue text-blue">"Login"</a>
        </Link>
        .
      </div>
    </div>
  );
}

export default WithSecureLayout(RegisterPage);
