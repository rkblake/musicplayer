import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from "./pages/library";
import Playlist from "./pages/playlist";
import './App.css'

type Tab = "Albums" | "Songs" | "Playlists" | "Settings";

function App() {
  const [tab, _setTab] = useState<Tab>("Settings");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/test" element={<Playlist />} />
          {tab == "Albums" && <div>

          </div>}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
