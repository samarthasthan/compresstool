import './uploadsection.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../../store/slices/SwitchTabSlice'
import { useRef } from 'react'
function UploadSection() {
  const currentTab = useSelector((state) => state.switch.value)
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    console.log(e.target.files[0].path)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    console.log(e.target.files[0].path)
  }

  const uploadHandle = (e) => {
    const files = e.target.files
    const filePaths = []

    // Extract the paths from the selected files
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].path
      filePaths.push(filePath)
    }

    // Send the file paths to the main process
    window.electron.ipcRenderer.send('add-files', filePaths)

    // Clear the input element by resetting its value
    if (inputFileRef.current) {
      inputFileRef.current.value = null
    }
    const getRecents = async () => {
      window.electron.ipcRenderer.send('send-recents')
    }
    getRecents()
    dispatch(toggle('right'))
    window.electron.ipcRenderer.send('compress-files')
    window.electron.ipcRenderer.on('take-update', () => {
      window.electron.ipcRenderer.send('send-recents')
    })
  }
  return (
    <div className={`upload-section ${currentTab === 'left' ? 'active' : ''}`}>
      <div className="upload-area " onDrop={handleDrop} onDragOver={handleDragOver}>
        <label htmlFor="input">
          Click here or <br /> drag and drop your files
          <input
            id="input"
            type="file"
            onInput={(e) => uploadHandle(e)}
            ref={inputFileRef}
            multiple
          />
        </label>
      </div>
    </div>
  )
}

export default UploadSection
