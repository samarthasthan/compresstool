import Settings from './pages/settings/Settings'
import HomePage from './pages/homepage/HomePage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { changeSettings } from './utils/SettingsUtils'
function App() {
  const handleChangeSettings = changeSettings() // Initialize the function

  useEffect(() => {
    handleChangeSettings(null) // Use the function to change settings
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/settings" element={<Settings></Settings>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
