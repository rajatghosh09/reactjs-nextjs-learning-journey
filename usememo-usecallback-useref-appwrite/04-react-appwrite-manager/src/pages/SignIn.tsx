import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { SigninYupValidation } from '../services/validation/auth.validation'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { account, tablesDB } from '../lib/appwrite-config'
import { Query } from 'appwrite'
import Cookies from "js-cookie";
import { toast } from 'sonner'
import type { Signin } from '../typescript/interface/studentList'


const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(SigninYupValidation),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const handleSinginValidation = async (data:Signin) => {
    setLoading(true)
    console.log(data);

    try {
       await tablesDB.listRows(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "signup",
        [Query.equal("email", data.email)]
      )

      const response = await account.createEmailPasswordSession(
        data.email,
        data.password
      )

      reset()
      Cookies.set("token", "true")
      navigate("/admin/dashboard")
      toast.success("Signin Succesfully 👍")
      console.log("signin response", response);


    } catch (error: any) {
      if (error?.type === "user_invalid_credentials") {
        toast.error("Invalid email or password ❌");
      } else {
        toast.error(error?.message || "Login failed ❌");
      }
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
              Welcome Back
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              mb={4}
            >
              Sign in to continue
            </Typography>

            <form onSubmit={handleSubmit(handleSinginValidation)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Email'
                      placeholder='Enter Your Email'
                      error={!!errors.email}
                      helperText={errors?.email ? errors?.email.message : ""}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Password'
                      placeholder='Enter Your Password'
                      error={!!errors.password}
                      helperText={errors?.password ? errors?.password?.message : ""}
                      fullWidth
                    />
                  )}
                />

                <Button
                  fullWidth
                  type='submit'
                  variant="contained"
                  color="primary"
                >
                  <Typography variant='button'>{loading ? "loading..." : "Sign In"}</Typography>
                </Button>

                <Typography variant="body2" sx={{ textAlign: "center", mt: 2, }}>
                  You Don't have an account?
                  <Typography
                    sx={{
                      color: "blue",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginLeft: "5px",
                      "&:hover": {
                        textDecoration: "underline",
                        opacity: 0.85,
                      },
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Create Account
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

export default SignIn