import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import LeftBar from "./Sidebar/LeftBar"

const App = () => {
  return (
    <div>
      <Outlet/>
      <Navbar/>
      <LeftBar/>
    </div>
  )
}

export default App