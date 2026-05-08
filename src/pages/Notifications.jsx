import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Circle, ChevronRight, ChevronDown } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import './Notifications.css'

const iconFor = (type) => {
  switch (type) {
    case 'resolved':  return <CheckCircle2 size={32} color="var(--green-color,#00a63e)" fill="var(--green-color,#00a63e)" strokeWidth={2} stroke="white" />
    case 'downtime':  return <AlertCircle  size={32} color="var(--red-color,#e2454c)"   fill="var(--red-color,#e2454c)"   strokeWidth={2} stroke="white" />
    case 'emptybelt': return <AlertCircle  size={32} color="var(--yellow-color,#d08700)" fill="var(--yellow-color,#d08700)" strokeWidth={2} stroke="white" />
    case 'planned':   return <Circle       size={32} color="var(--border-token,#d2d2d2)" />
    default:          return <Circle       size={32} color="var(--border-token,#d2d2d2)" />
  }
}

const groups = [
  {
    label: 'Today - May 15, 2026',
    items: [
      { type: 'resolved',  title: 'Resolved on Line 2',     start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
      { type: 'downtime',  title: 'Downtime on Line 2',     start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
      { type: 'resolved',  title: 'Resolved on Line 3',     start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
      { type: 'emptybelt', title: 'Empty Belt on Line 3',   start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
      { type: 'planned',   title: 'Planned stop on Line 1', start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
    ],
  },
  {
    label: 'Yesterday - May 14, 2026',
    items: [
      { type: 'resolved',  title: 'Resolved on Line 2',     start: '10:42 AM, May 15, 2026', duration: '18 minutes (ongoing)' },
    ],
  },
]

export default function Notifications() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="notif-main">
        <div className="notif-page-header">
          <h1 className="notif-title">Notifications</h1>
          <p className="notif-subtitle">Stay updated with important alerts and system updates</p>
        </div>

        <div className="notif-card">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="notif-group-header">
                <span>{group.label}</span>
              </div>
              {group.items.map((item, i) => (
                <div key={i} className="notif-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/dashboard/event/${i + 1}`)}>
                  <div className="notif-icon">{iconFor(item.type)}</div>
                  <div className="notif-content">
                    <p className="notif-row-title">{item.title}</p>
                    <div className="notif-meta">
                      <span>Started at {item.start}</span>
                      <span>Duration {item.duration}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="var(--foreground,#121212)" style={{ flexShrink: 0, opacity: 0.4 }} />
                </div>
              ))}
            </div>
          ))}

          <div className="notif-load-more">
            <button className="notif-load-btn" onClick={() => setLoaded(true)}>
              Load more <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
