import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import WithSecureLayout from "../layouts/withSecureLayout";
import AuthContext from "../context/AuthProvider";
import AuthService from "../services/auth.service";

import { yupResolver } from "@hookform/resolvers/yup";
import AlertComponent from "../components/form/alert";
import { RegisterSchema } from "../validations/register.schema";

const authService = new AuthService();

// function RegisterPage() {
//   const { setAuth, auth, setUser } = useContext(AuthContext);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(RegisterSchema),
//   });

//   async function onSubmit(event: any) {
//     try {
//       const { passwordRepeat, ...dataWithoutRepeatedPassword } = event;

//       const response: any = await authService.register(
//         dataWithoutRepeatedPassword
//       );

//       setUser((prev: any) => ({ ...prev, ...response.user }));

//       router.push("/");

//       console.log(response);
//     } catch (error) {
//       setAuth((prev: any) => {
//         return { ...prev, name: "Error" };
//       });
//     }
//   }

//   return (
//     <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center mt-5 mb-5">
//       <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
//         <h1 className="mb-8 text-3xl text-center"> Register Page </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//           <div className="flex">
//             <div className="mr-2">
//               <div className="mb-2 block">
//                 <Label htmlFor="Name" value="Name" />
//               </div>
//               <TextInput id="Name" {...register("name")} />
//               {errors.name && <AlertComponent message="Name error!" />}
//             </div>

//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="Surname" value="Surname" />
//               </div>
//               <TextInput id="Surname" {...register("surname")} />
//               {errors.surname && <AlertComponent message="Surname error!" />}
//             </div>
//           </div>

//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="username" value="Username" />
//             </div>
//             <TextInput id="username" {...register("username")} />
//             {errors.username && <AlertComponent message="Name error!" />}
//           </div>

//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="email" value="Your email" />
//             </div>
//             <TextInput
//               id="email"
//               placeholder="name@flowbite.com"
//               {...register("email")}
//             />
//             {errors.email && <AlertComponent message="Email error!" />}
//           </div>

//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="password2" value="Your password" />
//             </div>
//             <TextInput
//               type="password"
//               shadow={true}
//               {...register("password")}
//             />
//             {errors.password && <AlertComponent message="Password error!" />}
//           </div>
//           <div>
//             <div className="mb-2 block">
//               <Label htmlFor="repeat-password" value="Repeat password" />
//             </div>
//             <TextInput
//               type="password"
//               shadow={true}
//               {...register("passwordRepeat")}
//             />
//             {errors.passwordRepeat && (
//               <AlertComponent message="Password again!" />
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <Checkbox id="agree" />
//             <Label htmlFor="agree">
//               I agree with the{" "}
//               <a
//                 href="/forms"
//                 className="text-blue-600 hover:underline dark:text-blue-500"
//               >
//                 terms and conditions
//               </a>
//             </Label>
//           </div>
//           <Button type="submit">Register new account</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

function RegisterPage() {
  return <h1>Register page</h1>;
}

export default WithSecureLayout(RegisterPage);
