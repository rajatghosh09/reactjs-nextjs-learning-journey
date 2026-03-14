import * as yup from "yup"


export const SignupYupValidation = yup.object({
    name: yup.string().required("firstname is required"),

    email: yup.string().email("invalid email").required("Email is required"),

    password: yup.string().required("Password is required"),
})


export const SigninYupValidation = yup.object({
    email: yup.string().email("invalid email").required("Email is required"),

    password: yup.string().required("Password is required"),
})