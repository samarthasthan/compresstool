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
            <RecentItem
              title={e.name}
              time={e.time}
              status={e.status}
              size={e.size}
              new_path={e.new_path}
              key={index}
            ></RecentItem>
          ))
        ) : (
          <>
            <div className="empty">
              <p>
                Welcome!! Go to new task tab<br></br> and compress some images
              </p>
            </div>
          </>
        )
      ) : (
        <h1>Error</h1>
      )}
    </div>
  )
}

export default RecentSection
