import { Box, Container } from "@mui/material"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"


const Wrapper = () => {

  return (
    <>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >

        <Box sx={{ width: "100%" }}>
          <Navbar />
        </Box>


        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1200px" }}>
            <Outlet />
          </Box>
        </Box>

      </Container>
    </>
  )
}

export default Wrapper