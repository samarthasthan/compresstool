import './settingsection.css'
import folderIcon from '../../../assets/folder.svg'
import equalizerIcon from '../../../assets/equalizer.svg'
import resetIcon from '../../../assets/loop.svg'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { changeSettings } from '../../../utils/SettingsUtils'
import { useDispatch } from 'react-redux'
import { getSettings } from '../../../store/slices/SettingsSlice'
import imageicon from '../../../assets/image-line.svg'

function SettingSection() {
  const dispatch = useDispatch()
  const handleChangeSettings = changeSettings()
  const { quality, location, format } = useSelector((state) => state.settings.value)
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
    handleChangeSettings({ location: location, quality: value, format: format })
    toggleQualityOptions(false)
  }

  async function onChangeDir() {
    try {
      // Send the 'open-dir-changer' event and wait for its completion
      await new Promise((resolve) => {
        // Send the 'open-dir-changer' event
        window.electron.ipcRenderer.send('open-dir-changer', quality)

        // Listen for an event indicating the folder selection is completed
        window.electron.ipcRenderer.once('dir-selection-completed', () => {
          // Resolve the Promise once the folder selection is completed
          resolve()
        })
      })

      // After the folder selection is completed, send 'get-settings' event
      window.electron.ipcRenderer.send('get-settings')

      // Listen for 'take-settings' event and process settings
      window.electron.ipcRenderer.once('take-settings', (event, settingsObject) => {
        dispatch(getSettings(settingsObject))
      })
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error)
    }
  }

  function onChangeFormat(value) {
    handleChangeSettings({ location: location, quality: quality, format: value })
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
          <div
            className="size"
            onClick={() => {
              onChangeDir()
            }}
          >
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
            <p className="time">{quality === 55 ? 'Recommended (55%)' : quality}</p>
          </div>

          <img
            className="reset-quality"
            src={resetIcon}
            alt="icon"
            onClick={() => {
              onSaveHandler(55)
              sliderOnChange(55)
            }}
          />

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
      <div className="setting-item format">
        <div className="wrapper">
          <div className="icon">
            <img src={imageicon} alt="icon" />
          </div>
          <div className="title-area">
            <p className="title-bold">Change Image Format</p>
            <p className="time">Current- {format.toUpperCase()}</p>
          </div>
          <div className="size">
            <p>{format.toUpperCase()}</p>
            <div className="drop-down">
              <p
                onClick={() => {
                  onChangeFormat('jpeg')
                }}
              >
                JPEG
              </p>
              <p
                onClick={() => {
                  onChangeFormat('png')
                }}
              >
                PNG
              </p>
              <p
                onClick={() => {
                  onChangeFormat('webp')
                }}
              >
                WEBP
              </p>
              <p
                onClick={() => {
                  onChangeFormat('avif')
                }}
              >
                AVIF
              </p>
              <p
                onClick={() => {
                  onChangeFormat('tiff')
                }}
              >
                TIFF
              </p>
            </div>
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
