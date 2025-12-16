import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import ChatHome from "./components/chat/ChatHome"
import ChatThread from "./components/chat/ChatThread"
import VideoRoom from "./components/video/VideoRoom"
import Layout from "./layouts/Layout"
import LoginPage from "./pages/LoginPage"

export default function App() {

  return (
    <>
    <Router>
      <Routes>
            <Route path="/" element={<LoginPage />} />
        <Route element={<Layout/>}>
            <Route path="/chat" element={<ChatHome />} />
            <Route path="/chat/:userId" element={<ChatThread />} />
            <Route path="/meet" element={<VideoRoom />} />
        </Route>  
      </Routes>
    </Router>
    </>
  )
} 

