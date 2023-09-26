import Settings from './pages/settings/Settings'
import HomePage from './pages/homepage/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/settings" element={<Settings></Settings>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
