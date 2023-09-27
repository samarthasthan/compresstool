import './recentsection.css'
import RecentItem from './recentitem/RecentItem'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function RecentSection() {
  const currentTab = useSelector((state) => state.switch.value)
  const recents = useSelector((state) => state.recents.value)
  return (
    <div className={`recent-section ${currentTab === 'right' ? 'active' : ''}`}>
      {recents ? (
        recents.length > 0 ? (
          recents.map((e, index) => (
            <RecentItem title={e.name} time={e.time} status={e.status} key={index}></RecentItem>
          ))
        ) : (
          <h1>Empty</h1>
        )
      ) : (
        <h1>Error</h1>
      )}
    </div>
  )
}

export default RecentSection
