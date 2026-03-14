import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { SignupYupValidation } from "../services/validation/auth.validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { account, tablesDB } from "../lib/appwrite-config";
import { ID } from "appwrite";
import { toast } from "sonner";
import type { Signup } from "../typescript/interface/studentList";


const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(SignupYupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const handleSingupValidation = async (data:Signup) => {
    setLoading(true)
    console.log("data", data);

    try {
      const accountresponse = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name,
      )
      // await account.updatePrefs({
      //   phone: data.phone,
      // });
      console.log("acc created", accountresponse);

      const response = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "signup",
        rowId: ID.unique(),
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "student"
        }
      })
      toast.success("Profile create successfully ✔️");
      reset();
      console.log("response", response);
      
    } catch (error:any) {
      console.log(error);
      toast.error(
      error?.message || "Something went wrong. Please try again ❌"
    );
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          px: 2,
        }}
      >
        <Card sx={{ width: 420 }}>
          <CardContent sx={{ px: 4, py: 5 }}>
            <Typography variant="h4" textAlign="center" mb={1}>
              Create Account
            </Typography>

            <Typography variant="body2" textAlign="center" mb={4}>
              Sign up to get started
            </Typography>

            <form onSubmit={handleSubmit(handleSingupValidation)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      placeholder="Enter your name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      placeholder="Enter your email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                    />
                  )}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <Typography variant='button'>{loading ? "loading..." : "Sign Up"}</Typography>

                </Button>

                <Typography variant="body2" textAlign="center" mt={2}>
                  Already have an account?
                  <Typography
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      cursor: "pointer",
                      ml: 0.5,
                      "&:hover": {
                        textDecoration: "underline",
                        opacity: 0.85,
                      },
                    }}
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </Typography>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default SignUp