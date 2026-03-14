import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { StudentDetailsYupValidation } from "../../services/validation/admin.student.data.validation";
import { bucket, tablesDB } from "../../lib/appwrite-config";
import { ID, Query } from "appwrite";
import { Avatar, Box, Button, Card, CardContent, FormHelperText, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { toast } from "sonner";
// import type { SubmitHandler } from "react-hook-form";
// import type { StudentFormData } from "../../typescript/interface/studentList";



const AddStudentDetails = () => {
    const { id } = useParams();
    console.log("id", id);

    const [loading, setLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await tablesDB.listRows(
                    import.meta.env.VITE_APPWRITE_DATABASE as string,
                    "student-details",
                    [Query.equal("$id", id)]
                );
                const student = response?.rows?.[0];

                if (student) {
                    reset({
                        firstName: student.firstName ?? "",
                        lastName: student.lastName ?? "",
                        age: student.age ?? "",
                        phonenumber: student.phonenumber ?? "",
                        gender: student.gender ?? "",
                        dateOfBirth: student.dateOfBirth ?? "",
                        address: student.address ?? "",
                        image: undefined,
                    });

                    setPreview(student.image ?? null);
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        if (id) {
            fetchData();
        }
    }, []);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(StudentDetailsYupValidation),
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            phonenumber: "",
            gender: "",
            dateOfBirth: "",
            address: "",
            image: undefined,
        },
    });

    const handleDataSubmit = async (data:any) => {
        setLoading(true)
        console.log("Form data:", data);

        try {
            let imageUrl = preview ?? "";

            if (data.image?.length) {
                const file = data.image[0];

                const uploaded = await bucket.createFile(
                    import.meta.env.VITE_APPWRITE_BUCKET as string,
                    ID.unique(),
                    file
                );

                imageUrl = bucket.getFileView(
                    import.meta.env.VITE_APPWRITE_BUCKET as string,
                    uploaded.$id
                );
            }

            if (id) {
                await tablesDB.updateRow({
                    databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
                    tableId: "student-details",
                    rowId: id,
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth,
                        address: data.address,
                        image: imageUrl,
                    },
                });

                toast.success("Student updated successfully ✔️");
            } else {
                await tablesDB.createRow({
                    databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
                    tableId: "student-details",
                    rowId: ID.unique(),
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth,
                        address: data.address,
                        image: imageUrl,
                    },
                });

                toast.success("Student added successfully ✔️");
            }

            reset();
            navigate("/admin/view-students")

        } catch (error: any) {
            // console.log(error);
            toast.error(error?.message || "Something went wrong ❌");
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                }}
            >
                <Card sx={{ width: "100%", maxWidth: 700 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" mb={3} textAlign={"center"}>
                            {id ? "Edit Student Details" : "Add Student Details"}
                        </Typography>


                        <form onSubmit={handleSubmit(handleDataSubmit)}>
                            <Stack direction="row" spacing={3} alignItems="center" mb={4}>
                                <Avatar
                                    src={preview || undefined}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: "background.paper",
                                        border: "2px dashed",
                                        borderColor: "divider",
                                    }}
                                />

                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <Button component="label" variant="outlined">
                                            {preview ? "Change Image" : "Upload Image"}
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    field.onChange(files);

                                                    if (files?.length) {
                                                        setPreview(URL.createObjectURL(files[0]));
                                                    }
                                                }}
                                            />
                                        </Button>
                                    )}
                                />
                                {errors.image && (
                                    <FormHelperText>{errors.image.message}</FormHelperText>
                                )}
                            </Stack>

                            <Stack spacing={3}>
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="First Name"
                                                error={!!errors.firstName}
                                                helperText={errors.firstName?.message}
                                                fullWidth
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Last Name"
                                                error={!!errors.lastName}
                                                helperText={errors.lastName?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Stack>

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                                    <Controller
                                        name="age"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Age"
                                                error={!!errors.age}
                                                helperText={errors.age?.message}
                                                fullWidth
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="phonenumber"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Phone Number"
                                                error={!!errors.phonenumber}
                                                helperText={errors.phonenumber?.message}
                                                fullWidth
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                select
                                                label="Gender"
                                                error={!!errors.gender}
                                                helperText={errors.gender?.message}
                                                fullWidth
                                            >
                                                <MenuItem value="">Select Gender</MenuItem>
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </TextField>
                                        )}
                                    />

                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Date of Birth"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                error={!!errors.dateOfBirth}
                                                helperText={errors.dateOfBirth?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Stack>

                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Address"
                                            multiline
                                            rows={3}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                            fullWidth
                                        />
                                    )}
                                />

                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {id ? "Update Student" : "Add Student"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => navigate("/admin/view-students")}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>

                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default AddStudentDetails