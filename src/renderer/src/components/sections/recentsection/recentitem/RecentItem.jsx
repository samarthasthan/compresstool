/* eslint-disable react/prop-types */
import './recentitem.css'
import imageicon from '../../../../assets/image-line.svg'
import dots from '../../../../assets/dots.svg'
function RecentItem({ title, time, status, size }) {
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
        <div className="option-section">
          <img className="options" src={dots} alt="options" />
        </div>
      </div>
    </div>
  )
}

export default RecentItem
