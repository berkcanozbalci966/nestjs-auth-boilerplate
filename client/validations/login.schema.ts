import * as yup from "yup";
import Validator from "validator";

export const LoginSchema = yup.object({
  usernameOrEmail: yup
    .string()
    .required() //@ts-ignore
    .test("isValid", (value) => {
      if (value && typeof value == "string") {
        return (
          Validator.isEmail(value) ||
          (value?.length >= 5 && value?.length <= 40)
        );
      }
    }),
  password: yup.string().required().min(6).max(25),
});
