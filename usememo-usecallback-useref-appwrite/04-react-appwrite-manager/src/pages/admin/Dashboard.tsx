import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, } from "@mui/material";
import { account } from "../../lib/appwrite-config";
import { useNavigate } from "react-router-dom";
import type { DashboardUser } from "../../typescript/interface/studentList";

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<DashboardUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await account.get();
        setUser(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Typography variant="h4" mb={1}>
        Dashboard
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Welcome back{user?.name ? `, ${user.name}` : ""}
      </Typography>



      <Typography variant="h5" mb={2}>
        Quick Actions
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => navigate("/admin/add-student-details")}>
          Add Student
        </Button>

        <Button variant="outlined" onClick={() => navigate("/admin/view-students")} >
          View Students
        </Button>
      </Stack>
    </Box>
  );
};

export default Dashboard;
