import './settingsection.css'
import folderIcon from '../../../assets/folder.svg'
import equalizerIcon from '../../../assets/equalizer.svg'
import resetIcon from '../../../assets/loop.svg'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { changeSettings } from '../../../utils/SettingsUtils'
function SettingSection() {
  const handleChangeSettings = changeSettings()
  const { quality, location } = useSelector((state) => state.settings.value)
  const [sliderValue, setSliderValue] = useState(0)
  const [qualityOption, toggleQualityOptions] = useState(false)
  useEffect(() => {
    sliderOnChange(quality)
  }, [])

  const openQualitySelector = (value) => {
    toggleQualityOptions(value)
  }

  function sliderOnChange(value) {
    const mySlider = document.getElementById('my-slider')
    let valPercent = (value / 100) * 100
    mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`
    mySlider.value = value
    const newValue = value
    setSliderValue(newValue)
  }

  function onSaveHandler(value) {
    handleChangeSettings({ location: location, quality: value })
    toggleQualityOptions(false)
  }

  return (
    <div className="setting-section ">
      <div className="setting-item">
        <div className="wrapper">
          <div className="icon">
            <img src={folderIcon} alt="icon" />
          </div>
          <div className="title-area">
            <p className="title-bold">Storage Location</p>
            <p className="time">{location}</p>
          </div>
          <div className="size">
            <p>Change</p>
          </div>
          <div className="option-section"></div>
        </div>
      </div>
      <div className="setting-item">
        <div className="wrapper">
          <div className="icon">
            <img src={equalizerIcon} alt="icon" />
          </div>
          <div className="title-area">
            <p className="title-bold">Adjust quality</p>
            <p className="time">{quality === 85 ? 'Recommended (85%)' : quality}</p>
          </div>

          <img className="reset-quality" src={resetIcon} alt="icon" />

          <div className="size">
            <p
              onClick={() => {
                openQualitySelector(true)
              }}
            >
              Adjust
            </p>
          </div>
          <div className="option-section"></div>
        </div>
      </div>
      <div className="footer">
        <div className="version">
          <p className="title">Version: 1.0.0</p>
        </div>
      </div>
      <div className={`${qualityOption === false ? 'disable' : ''} quality-section`}>
        <div className="quality-setting">
          <div className="quality-selector">
            <input
              type="range"
              id="my-slider"
              min={0}
              max={100}
              defaultValue={0}
              onChange={(e) => {
                sliderOnChange(e.target.value)
              }}
            />
            <div id="slider-value" className="title">
              {sliderValue}
            </div>
          </div>
          <div className="confirm-options">
            <div
              className="discard-option options"
              onClick={() => {
                openQualitySelector(false)
              }}
            >
              <p>Discard</p>
            </div>
            <span className="divider"></span>
            <div
              className="save-option options"
              onClick={() => {
                const sliderValue = document.getElementById('my-slider').value
                onSaveHandler(sliderValue)
              }}
            >
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingSection
