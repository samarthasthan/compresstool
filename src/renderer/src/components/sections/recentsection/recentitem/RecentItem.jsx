import './recentitem.css'
import imageicon from '../../../../assets/image-line.svg'
import dots from '../../../../assets/dots.svg'
function RecentItem() {
  return (
    <div className="recent-item">
      <div className="wrapper">
        <div className="icon">
          <img src={imageicon} alt="icon" />
        </div>
        <div className="title-area">
          <p className="title">user-journey-01.pdf</p>
          <p className="time">2m ago</p>
        </div>
        <div className="size">
          <p>64kb</p>
        </div>
        <div className="option-section">
          <img className="options" src={dots} alt="options" />
        </div>
      </div>
    </div>
  )
}

export default RecentItem
