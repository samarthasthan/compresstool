import './settingsheader.css'
import { useNavigate } from 'react-router-dom'
import arroaBack from '../../../assets/arrowback.svg'
function SettingsHeader() {
  const navigate = useNavigate()
  const onBack = () => {
    navigate('/')
  }
  return (
    <div className="settings-header">
      <div className="back">
        <img
          className="back-icon"
          src={arroaBack}
          alt="back_btn"
          onClick={() => {
            onBack()
          }}
        />
      </div>
      <div className="title">
        <p className="title">Settings</p>
      </div>
    </div>
  )
}

export default SettingsHeader
