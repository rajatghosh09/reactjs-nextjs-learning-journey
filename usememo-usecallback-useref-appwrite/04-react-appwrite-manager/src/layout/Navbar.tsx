import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite-config";
import { toast } from "sonner";
import Cookies from "js-cookie";


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        try {
            await account.deleteSession("current");
            toast.success("Succesfully Logout 👋")
            Cookies.remove("token")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "secondary.main",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar sx={{ position: "relative" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    <SchoolIcon sx={{ color: "primary.main", fontSize: 32, mr: 1 }} />
                    <Typography
                        variant="h6"
                        sx={{ color: "primary.main", fontWeight: 700 }}
                    >
                        Student Portal
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: 4,
                    }}
                >
                    <Typography sx={navItemStyle} onClick={() => navigate("/")}>
                        Home
                    </Typography>

                    <Typography
                        sx={navItemStyle}
                        onClick={() => navigate("/admin/add-student-details")}
                    >
                        Add Student
                    </Typography>

                    <Typography
                        sx={navItemStyle}
                        onClick={() => navigate("/admin/view-students")}
                    >
                        View Students
                    </Typography>
                </Box>


                <Box sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;


const navItemStyle = {
    color: "secondary.contrastText",
    fontWeight: 500,
    cursor: "pointer",
    position: "relative",
    "&:hover": {
        color: "primary.main",
    },
};
