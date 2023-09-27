/* eslint-disable react/prop-types */

import './recentitem.css'
import imageicon from '../../../../assets/image-line.svg'
import folderImage from '../../../../assets/folder-image.svg'
function RecentItem({ title, time, status, size, new_path }) {
  function handleOpenFolder() {
    window.electron.ipcRenderer.send('open-file-path', new_path)
  }
  return (
    <div className="recent-item">
      <div className="wrapper">
        <div className="icon">
          <img src={imageicon} alt="icon" />
        </div>
        <div className="title-area">
          <p className="title">{title}</p>
          <p className="time">{time}</p>
        </div>
        <div className="size">
          {size ? (
            <p>{size}</p>
          ) : status === 'error' ? (
            <p className="error">Error</p>
          ) : (
            <p>{status}</p>
          )}
        </div>
        <div className="open-folder">
          <img
            className="icon options"
            src={folderImage}
            alt="open-folder"
            onClick={() => {
              handleOpenFolder()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RecentItem
