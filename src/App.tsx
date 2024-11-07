import { useState } from 'react'
import './App.css'

type Tab = "Albums" | "Songs" | "Playlists" | "Settings";

function App() {
  const [tab, _setTab] = useState<Tab>("Settings");

  return (
    <>
      {tab == "Albums" && <div>

      </div>}
    </>
  )
}

export default App
