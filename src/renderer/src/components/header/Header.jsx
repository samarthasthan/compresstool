import './header.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../store/slices/SwitchTabSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import settingIcon from '../../assets/settings.svg'
function Header() {
  const navigate = useNavigate()
  const currentTab = useSelector((state) => state.switch.value)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggle('left'))
  }, [])
  const tabHandler = (value) => {
    dispatch(toggle(value))
  }
  const onSettingHandel = () => {
    navigate('/settings')
  }
  return (
    <header className="header">
      <div className="switch-section">
        <div className={`switch-bg ${currentTab === 'right' ? 'right' : ''}`}></div>
        <button
          className={`${currentTab === 'left' ? 'active-btn' : ''} title`}
          onClick={() => tabHandler('left')}
        >
          New Task
        </button>
        <button
          className={`${currentTab === 'right' ? 'active-btn' : ''} title`}
          onClick={() => tabHandler('right')}
        >
          Recent
        </button>
      </div>
      <div className="settings">
        <img
          className="setting-icon"
          src={settingIcon}
          alt="setting_icon"
          onClick={() => {
            onSettingHandel()
          }}
        />
      </div>
    </header>
  )
}

export default Header
