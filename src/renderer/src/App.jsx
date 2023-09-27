import Settings from './pages/settings/Settings'
import HomePage from './pages/homepage/HomePage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { setRecents } from './store/slices/RecentSlice'
import { changeSettings } from './utils/SettingsUtils'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const handleChangeSettings = changeSettings() // Initialize the function

  useEffect(() => {
    handleChangeSettings(null) // Use the function to change settings

    const getRecents = async () => {
      window.electron.ipcRenderer.send('send-recents')
      await window.electron.ipcRenderer.on('take-recents', (event, args) => {
        dispatch(setRecents(args))
        console.log(args)
      })
    }
    getRecents()
    return () => {
      window.electron.ipcRenderer.removeListener('take-recents')
    }
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
