import { Outlet } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"


const Layout = () => {
  return (
      <>
          <ProgressBar/>
          <Outlet/>
      </>
  )
}

export default Layout