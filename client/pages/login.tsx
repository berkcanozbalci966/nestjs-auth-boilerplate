import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Login as LoginType } from "../types/auth.type";
import AuthService from "../services/auth.service";
import AuthContext from "../context/AuthProvider";
import WithSecureLayout from "../layouts/withSecureLayout";
import AlertComponent from "../components/form/alert";
import { LoginSchema } from "../validations/login.schema";
import toastEmitter from "../utils/toast-emitter";

const authService = new AuthService();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { setAuth, auth, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [LoginButtonDisable, setLoginButtonDisable] = useState(false);

  async function onSubmit(event: LoginType) {
    try {
      setLoginButtonDisable(true);
      await authService.login(event).then((response: any) => {
        const { user, ...authInfo } = response;

        setAuth((prev: any) => ({ ...prev, ...authInfo }));

        setUser((prev: any) => ({ ...prev, ...user }));
        toastEmitter("info", "başarıyla giriş yapıldı");
        router.push("/");

        console.log(response);
      });
    } catch (error) {
      toastEmitter("error", "Giriş yapılamadı");
      setTimeout(() => {
        setLoginButtonDisable(false);
      }, 1000);
      setUser((prev: any) => {
        return { ...prev, name: "Error" };
      });
    }
  }

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center"> Login Page </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            {...register("usernameOrEmail")}
            placeholder="Your email or username"
          />
          <p className="mt-2">
            {" "}
            {errors.usernameOrEmail && <AlertComponent message="Name error!" />}
          </p>
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mt-4"
            {...register("password")}
            placeholder={"Your password"}
          />{" "}
          {errors.password && <AlertComponent message="Password error!" />}
          <button
            type="submit"
            className="w-full text-center py-3 rounded btn btn-info text-white mt-4"
            disabled={LoginButtonDisable}
          >
            {"Login"}
          </button>
        </form>
      </div>
    </div>

    // <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5 mb-5">
    //   <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
    //     <h1 className="mb-8 text-3xl text-center"> Login Page </h1>

    //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    //       <div>
    //         <div className="mb-2 block">
    //           <Label htmlFor="usernameOrEmail" value="Your email or username" />
    //         </div>
    //         <TextInput id="usernameOrEmail" {...register("usernameOrEmail")} />
    //         {errors.usernameOrEmail && <AlertComponent message="Name error!" />}
    //       </div>
    //       <div>
    //         <div className="mb-2 block">
    //           <Label htmlFor="password2" value="Your password" />
    //         </div>
    //         <TextInput
    //           type="password"
    //           shadow={true}
    //           {...register("password")}
    //         />
    //         {errors.password && <AlertComponent message="Password error!" />}
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <Checkbox id="agree" />
    //         <Label htmlFor="agree">
    //           I agree with the{" "}
    //           <a className="text-blue-600 hover:underline dark:text-blue-500">
    //             terms and conditions
    //           </a>
    //         </Label>
    //       </div>
    //       <Button type="submit" disabled={LoginButtonDisable}>
    //         Login
    //       </Button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default WithSecureLayout(Register);
