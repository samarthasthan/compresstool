import './settingsection.css'
import folderIcon from '../../../assets/folder.svg'
import equalizerIcon from '../../../assets/equalizer.svg'

import resetIcon from '../../../assets/loop.svg'
import { useState, useEffect } from 'react'

function SettingSection() {
  const [sliderValue, setSliderValue] = useState(0)
  const [qualityOption, toggleQualityOptions] = useState(false)
  function sliderOnChange(value) {
    const mySlider = document.getElementById('my-slider')
    let valPercent = (value / 100) * 100
    mySlider.style.background = `linear-gradient(to right, #3264fe ${valPercent}%, #d5d5d5 ${valPercent}%)`
    mySlider.value = value
    const newValue = value
    setSliderValue(newValue)
  }
  useEffect(() => {
    sliderOnChange(56)
  }, [])

  const openQualitySelector = (value) => {
    toggleQualityOptions(value)
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
            <p className="time">/Users/samarthasthan/Compresstool</p>
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
            <p className="time">Recommended (85%)</p>
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
            <div className="save-option options">
              <p>Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingSection
