"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/zustand/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface RegisterFromvalues {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
  auth_user_is?: string;
  image?: File | null;
}

const registerValidation = yup.object({
  name: yup.string().required("name is required!"),
  email: yup.string().email("Invalid Email address").required("email is required!"),
  phone: yup.string().required("phone number is required!"),
  password: yup.string().min(6, "password must be 6 character").required("password is required!"),
});


const Register = () => {
  const router = useRouter();
  const { loading, registerUser } = useAuthStore();
  const [preview, setPreview] = useState("");
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFromvalues>({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFromvalues) => {
    console.log("data from register", data);
    try {
      const response = await registerUser(data);
      console.log("register page", response);
      reset();
      setPreview("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("email")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.phone?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...register("password")}
                />
                {errors && (
                  <p className="text-sm text-red-500">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div>
                <div>
                  {preview && (
                    <Image
                      src={preview}
                      alt="preview"
                      width={200}
                      height={200}
                      loading="lazy"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/jpeg, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {loading ? "loading..." : "Register"}
            </Button>
          </CardFooter>
        </form>
        {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            go to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
