import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
// import Library from "./pages/library";
import Playlist from "./pages/playlist";
// import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
