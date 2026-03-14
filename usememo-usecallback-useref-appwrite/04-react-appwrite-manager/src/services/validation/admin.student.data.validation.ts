import * as yup from "yup"


export const StudentDetailsYupValidation = yup.object({
    firstName: yup.string().required("firstname is required"),
    lastName: yup.string().required("lastname is required"),
    age: yup.string().required("age is required"),
    gender: yup.string().required("gender is required"),
    phonenumber: yup.string().required("Phone number is required!!"),
    dateOfBirth: yup.string().required("date of birth is required"),
    address: yup.string().required("address is required"),
    image: yup.mixed().optional()
})