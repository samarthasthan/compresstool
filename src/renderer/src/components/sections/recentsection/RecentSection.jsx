import './recentsection.css'
import RecentItem from './recentitem/RecentItem'
import { useSelector } from 'react-redux/es/hooks/useSelector'
function RecentSection() {
  const currentTab = useSelector((state) => state.switch.value)
  return (
    <div className={`recent-section ${currentTab === 'right' ? 'active' : ''}`}>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
      <RecentItem></RecentItem>
    </div>
  )
}

export default RecentSection
