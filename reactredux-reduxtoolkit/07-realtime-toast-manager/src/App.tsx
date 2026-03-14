import './App.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routing/Routes'
import { Toaster } from 'sonner'
import ReduxProvider from './Hooks/Utils/ReduxProvider'

function App() {

  return (
    <>
      <ReduxProvider>
        <Toaster position='top-center' richColors closeButton/>
        <RouterProvider router={Routes} />
      </ReduxProvider>
    </>
  )
}

export default App
