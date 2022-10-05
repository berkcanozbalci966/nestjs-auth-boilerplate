import * as yup from "yup";

export const RegisterSchema = yup.object({
  username: yup.string().required().min(4).max(40),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(25),
  name: yup.string().required().min(1).max(50),
  surname: yup.string().required().min(1).max(50),
  passwordRepeat: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
