import './mainbody.css'
import UploadSection from '../sections/uploadsection/UploadSection'
import RecentSection from '../sections/recentsection/RecentSection'
function Mainbody() {
  return (
    <div className="main-body">
      <UploadSection></UploadSection>
      <RecentSection></RecentSection>
    </div>
  )
}

export default Mainbody
