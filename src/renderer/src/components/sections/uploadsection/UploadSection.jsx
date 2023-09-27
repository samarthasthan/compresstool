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
    const files = e.dataTransfer.files

    // Filter out non-image files
    const imageFiles = Array.from(files).filter((file) => {
      // Check if the file type starts with "image/"

      return file.type.startsWith('image/')
    })

    addFiles(imageFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const uploadHandle = (e) => {
    const files = e.target.files
    addFiles(files)
  }

  function addFiles(files) {
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
          <p>
            Click here or <br /> drag and drop your files
          </p>
          <input
            id="input"
            type="file"
            onInput={(e) => uploadHandle(e)}
            ref={inputFileRef}
            multiple
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )
}

export default UploadSection
