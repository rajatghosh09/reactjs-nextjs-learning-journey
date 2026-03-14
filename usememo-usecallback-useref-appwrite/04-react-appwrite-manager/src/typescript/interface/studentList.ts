export interface studentDetails {
  first_name?: string;
  last_name?: string;
  age?: number | string;
  gender?: "male" | "female" | "other" | "";
  phonenumber?: string;
  date_of_birth?: string;
  address?: string;
  image?: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  age: string | number;
  phonenumber: string;
  gender: "" | "male" | "female" | "other";
  dateOfBirth: string;
  address: string;
  image: FileList | null;
}



export interface Signup {
  name: string,
  email: string,
  password: string,
}

export interface Signin {
  email: string,
  password: string,
}
// export interface Student {
//   $id: string;
//   firstName: string;
//   lastName: string;
//   phonenumber?: string;
//   age?: number;
//   gender?: string;
//   dateOfBirth?: string;
//   address?: string;
//   image?: string;
// }

export interface Student {
  $id: string;
  firstName?: string;
  lastName?: string;
  phonenumber?: string;
  image?: string;
  age?: number | string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface DashboardUser {
  name?: string;
}