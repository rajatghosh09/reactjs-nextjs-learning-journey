
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './Routing/Route'
// import ProjectEstimator from './pages/ProjectEstimator'
// import LargeForm from './components/LargeForm'
// import StopWatch from './components/StopWatch'

function App() {

  return (
   <>
   {/* <StopWatch/> */}
   {/* <LargeForm/> */}
   {/* <ProjectEstimator/> */}
   <BrowserRouter>
   <Navbar/>
   <AppRoutes/>
   </BrowserRouter>
   </>
  )
}

export default App
