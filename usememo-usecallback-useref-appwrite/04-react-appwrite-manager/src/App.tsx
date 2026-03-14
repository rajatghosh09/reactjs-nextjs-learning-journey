
import { RouterProvider } from "react-router-dom"
import Route from "./routing/Route"
import { Toaster } from "sonner"
import { ThemeProvider } from "@emotion/react"
import Theme from "./theme/theme"
import { CssBaseline } from "@mui/material"

function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <RouterProvider router={Route} />
      </ThemeProvider>
    </>
  )
}

export default App
