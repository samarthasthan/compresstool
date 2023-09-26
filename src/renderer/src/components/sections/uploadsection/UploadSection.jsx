import './uploadsection.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../../store/slices/SwitchTabSlice'

function UploadSection() {
  const currentTab = useSelector((state) => state.switch.value)
  const dispatch = useDispatch()
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files

    if (droppedFiles.length > 0) {
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i]
        console.log(file.path)
      }
    }
    dispatch(toggle('right'))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const uploadHandle = (e) => {
    window.electron.ipcRenderer.send('compress-image', e.target.files[0].path, 'electron')

    // const selectedFiles = e.target.files // Use e.target.files to access an array of selected files

    // if (selectedFiles.length > 0) {
    //   for (let i = 0; i < selectedFiles.length; i++) {
    //     const file = selectedFiles[i]
    //     console.log(file.path)
    //   }
    // }
    // dispatch(toggle('right'))
  }
  return (
    <div className={`upload-section ${currentTab === 'left' ? 'active' : ''}`}>
      <div className="upload-area " onDrop={handleDrop} onDragOver={handleDragOver}>
        <label htmlFor="input">
          Click here or <br /> dragand dropyour files
          <input id="input" type="file" onChange={(e) => uploadHandle(e)} />
        </label>
      </div>
    </div>
  )
}

export default UploadSection
