"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/zustand/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

interface LoginFromvalues {
  email: string;
  password: string;
}

const loginValidation = yup.object({
  email: yup.string().email("Invalid Email address").required("email is required!"),
  password: yup.string().min(6, "password must be 6 character").required("password is required!"),
});

const Login = () => {
  const router = useRouter();
  const { loading, error, loginUser } = useAuthStore();

  const {
    register,
    reset,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFromvalues>({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFromvalues) => {
    console.log("data from login", data);
    try {
      const response = await loginUser(data);
      console.log("login page", response);
      router.push("/admin/dashboard")
      toast.success("login successful")
      reset()
    } catch (error) {
      console.log(error);
      router.push("/login")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "loading..." : "Login"}
            </Button>
          </CardFooter>
        </form>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-center text-sm mb-2">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary font-medium cursor-pointer hover:underline transition-all duration-200"
          >
            Go register
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
