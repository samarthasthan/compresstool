import './header.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../store/slices/SwitchTabSlice'
import { useEffect } from 'react'
function Header() {
  const currentTab = useSelector((state) => state.switch.value)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggle('left'))
  }, [])
  const tabHandler = (value) => {
    dispatch(toggle(value))
  }

  window.api.switchtab((event, toggleTab) => {
    dispatch(toggle(toggleTab))
  })
  return (
    <header className="header">
      <div className="switch-section">
        <div className={`switch-bg ${currentTab === 'right' ? 'right' : ''}`}></div>
        <button
          className={currentTab === 'left' ? 'active-btn' : ''}
          onClick={() => tabHandler('left')}
        >
          New Task
        </button>
        <button
          className={currentTab === 'right' ? 'active-btn' : ''}
          onClick={() => tabHandler('right')}
        >
          Recent
        </button>
      </div>
    </header>
  )
}

export default Header
