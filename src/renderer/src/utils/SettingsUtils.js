// settingsUtils.js
import { useDispatch } from 'react-redux'
import { setSettings, getSettings } from '../store/slices/SettingsSlice'

export const changeSettings = () => {
  const dispatch = useDispatch()

  const handleChangeSettings = (value) => {
    dispatch(setSettings(value))
    window.electron.ipcRenderer.send('get-settings')
    window.electron.ipcRenderer.on('take-settings', (event, settingsObject) => {
      dispatch(getSettings(settingsObject))
    })
  }

  return handleChangeSettings
}
