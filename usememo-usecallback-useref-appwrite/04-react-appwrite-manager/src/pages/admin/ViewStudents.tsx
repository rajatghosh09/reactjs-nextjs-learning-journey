import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tablesDB } from "../../lib/appwrite-config";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import type { Student } from "../../typescript/interface/studentList";
import CloseIcon from "@mui/icons-material/Close";
import { IoCallSharp } from "react-icons/io5";
import { toast } from "sonner";


const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student|null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tablesDB.listRows(
          import.meta.env.VITE_APPWRITE_DATABASE as string,
          "student-details"
        );
        // console.log("response", response?.rows);
        setStudents(response.rows as Student[]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "student-details",
        rowId: id,
      });
      setStudents((prev) => prev.filter((item) => item.$id !== id));
      toast.success("Student details deleted successfully ✔️")
    } catch (error:any) {
      // console.log(error);
      toast.error(error?.message || "Something went wrong ❌")
    }
  };
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={3} textAlign={"center"} textTransform={"uppercase"}>
          Students List
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          useFlexGap
          flexWrap="wrap"
        >
          {students.map((student) => (
            <Card
              key={student.$id}
              sx={{ width: 300 }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  student.image
                }
                sx={{
                  objectFit: "cover",
                }}
                alt="student"
              />

              <CardContent>
                <Typography variant="h6">
                  {student.firstName} {student.lastName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <IoCallSharp /> {student.phonenumber || "N/A"}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button size="small" onClick={() => handleView(student)}>
                  View
                </Button>

                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    navigate(`/admin/edit-student-details/${student.$id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(student.$id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>

        
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            Student Details
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {selectedStudent && (
              <Stack spacing={1}>
                <Box
                  component="img"
                  src={
                    selectedStudent.image
                  }
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    backgroundColor: "#f3f4f6",
                    borderRadius: 1,
                    mb: 2,
                  }}
                />

                <Typography><b>Name:</b> {selectedStudent.firstName} {selectedStudent.lastName}</Typography>
                <Typography><b>Phone:</b> {selectedStudent.phonenumber}</Typography>
                <Typography><b>Age:</b> {selectedStudent.age}</Typography>
                <Typography><b>Gender:</b> {selectedStudent.gender}</Typography>
                <Typography><b>DOB:</b> {selectedStudent.dateOfBirth}</Typography>
                <Typography><b>Address:</b> {selectedStudent.address}</Typography>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  )
}

export default ViewStudents