import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import './Dashboard.css'

const IconChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AlertIcon = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="16" cy="16" r="16" fill={color} />
    <path d="M16 10V18" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="16" cy="22" r="1.5" fill="white"/>
  </svg>
)

const lines = [
  { name: 'Line 1', type: 'Paper Line', dot: '#00a63e', status: 'Uptime',     value: '92%', bg: 'var(--soft-green,#f0fdf4)',  color: 'var(--soft-green-foreground,#00a63e)' },
  { name: 'Line 2', type: 'Paper Line', dot: '#e2454c', status: 'Downtime',   value: '3%',  bg: 'var(--soft-red,#fef2f2)',    color: 'var(--soft-red-foreground,#e2454c)' },
  { name: 'Line 3', type: 'Paper Line', dot: '#d08700', status: 'Empty Belt', value: '5%',  bg: 'var(--soft-yellow,#fefce8)', color: 'var(--soft-yellow-foreground,#d08700)' },
  { name: 'Line 4', type: 'Paper Line', dot: '#00a63e', status: 'Uptime',     value: '92%', bg: 'var(--soft-green,#f0fdf4)',  color: 'var(--soft-green-foreground,#00a63e)' },
  { name: 'Line 3', type: 'Paper Line', dot: '#d08700', status: 'Empty Belt', value: '4%',  bg: 'var(--soft-yellow,#fefce8)', color: 'var(--soft-yellow-foreground,#d08700)' },
]

const metrics = [
  { label: 'Uptime',           value: '92%', color: 'var(--soft-green-foreground,#00a63e)', barColor: 'var(--soft-green-foreground,#00a63e)', barWidth: '60.5%', time: '22h 04m' },
  { label: 'Downtime',         value: '3%',  color: 'var(--soft-red-foreground,#e2454c)',   barColor: 'var(--red-color,#e2454c)',             barWidth: '7.4%',  time: '43m' },
  { label: 'Empty Belt',       value: '5%',  color: 'var(--soft-yellow-foreground,#d08700)',barColor: 'var(--yellow-color,#d08700)',           barWidth: '14.8%', time: '1h 12m' },
  { label: 'Planned Stop Time',value: '2%',  color: 'var(--muted-foreground,#121212)',      barColor: 'var(--muted-foreground,#121212)',       barWidth: '9.3%',  time: '43m', dimBar: true },
]

const alerts = [
  { color: '#e2454c', bg: 'var(--soft-red,#fef2f2)',    border: 'var(--border-red,#f5dddd)',  title: 'Downtime Detected',   line: 'Line 2', time: 'Started 5 minutes ago' },
  { color: '#d08700', bg: 'var(--soft-yellow,#fefce8)', border: 'rgba(0,0,0,0.1)',            title: 'Empty Belt Detected', line: 'Line 1', time: 'Started 2 minutes ago' },
]

const timeLabels = ['12 AM', '3 AM', '6 AM', '9 AM', '12 AM', '12 PM', '3 AM', '6 AM', '9 AM']

const timelinesData = [
  {
    line: 'Line 1',
    segments: [
      { left: '6.1%',   width: '0.2%',  color: 'var(--yellow-color,#d08700)' },
      { left: '9.8%',   width: '1.25%', color: 'var(--yellow-color,#d08700)' },
      { left: '21.4%',  width: '0.6%',  color: 'var(--red-color,#e2454c)' },
      { left: '57.6%',  width: '2.9%',  color: 'var(--red-color,#e2454c)' },
      { left: '68.97%', width: '5.1%',  color: 'var(--yellow-color,#d08700)' },
      { left: '41.3%',  width: '3.2%',  color: 'var(--muted-foreground,#121212)', opacity: 0.3 },
      { left: '86%',    width: '3.5%',  color: 'var(--muted-foreground,#121212)', opacity: 0.3 },
    ],
    annotations: [
      { left: '6.2%',   time: '2:15 AM', label: 'Empty Belt', duration: '15m', color: '#d08700' },
      { left: '21.7%',  time: '2:15 AM', label: 'Downtime',   duration: '15m', color: '#e2454c' },
      { left: '42.9%',  time: '2:15 AM', label: 'Downtime',   duration: '15m', color: '#121212', opacity: 0.5 },
      { left: '59.05%', time: '2:15 AM', label: 'Downtime',   duration: '15m', color: '#e2454c' },
      { left: '71.52%', time: '2:15 AM', label: 'Empty Belt', duration: '15m', color: '#d08700' },
      { left: '87.75%', time: '2:15 AM', label: 'Downtime',   duration: '15m', color: '#121212', opacity: 0.5 },
    ],
  },
  {
    line: 'Line 2',
    segments: [
      { left: '4.5%',   width: '8.2%',  color: 'var(--red-color,#e2454c)' },
      { left: '31.0%',  width: '1.8%',  color: 'var(--yellow-color,#d08700)' },
      { left: '48.5%',  width: '6.4%',  color: 'var(--red-color,#e2454c)' },
      { left: '63.2%',  width: '2.1%',  color: 'var(--yellow-color,#d08700)' },
      { left: '74.0%',  width: '4.0%',  color: 'var(--muted-foreground,#121212)', opacity: 0.3 },
      { left: '88.5%',  width: '5.2%',  color: 'var(--red-color,#e2454c)' },
    ],
    annotations: [
      { left: '4.5%',   time: '1:05 AM', label: 'Downtime',   duration: '2h',  color: '#e2454c' },
      { left: '31.0%',  time: '7:26 AM', label: 'Empty Belt', duration: '26m', color: '#d08700' },
      { left: '48.5%',  time: '11:38 AM',label: 'Downtime',   duration: '1h 32m', color: '#e2454c' },
      { left: '63.2%',  time: '3:10 PM', label: 'Empty Belt', duration: '30m', color: '#d08700' },
      { left: '74.0%',  time: '5:45 PM', label: 'Planned',    duration: '58m', color: '#121212', opacity: 0.5 },
      { left: '88.5%',  time: '9:14 PM', label: 'Downtime',   duration: '1h 15m', color: '#e2454c' },
    ],
  },
]

function TimelineChart({ data }) {
  return (
    <div className="db-timeline-chart">
      <span className="db-timeline-line-label">{data.line}</span>
      <div className="db-timeline-track">
        <div className="db-timeline-bar-bg" />
        {data.segments.map((s, i) => (
          <div
            key={i}
            className="db-timeline-seg"
            style={{ left: s.left, width: s.width, background: s.color, opacity: s.opacity ?? 1 }}
          />
        ))}
      </div>
      <div className="db-annotations">
        {data.annotations.map((a, i) => (
          <div key={i} className="db-ann" style={{ left: a.left }}>
            <div className="db-ann-line" style={{ borderColor: a.color, opacity: a.opacity ?? 1 }} />
            <div className="db-ann-dot" style={{ background: a.color, opacity: a.opacity ?? 1 }} />
            <p className="db-ann-time">{a.time}</p>
            <p className="db-ann-label">{a.label}</p>
            <p className="db-ann-dur">{a.duration}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const lineOptions = ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedLine, setSelectedLine] = useState('Line 1')
  const [lineDropOpen, setLineDropOpen] = useState(false)
  const lineDropRef = useRef(null)

  useEffect(() => {
    if (!lineDropOpen) return
    const close = e => { if (lineDropRef.current && !lineDropRef.current.contains(e.target)) setLineDropOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [lineDropOpen])

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header */}
        <div className="db-header">
          <p className="db-title">Dashboard</p>
          <p className="db-date">May 15, 2026</p>
        </div>

        <div className="db-sections">

          {/* Current Status */}
          <div className="db-card">
            <div className="db-card-header">
              <div>
                <p className="db-card-title">Current Status</p>
                <div className="db-card-sub">
                  <span>All Lines</span>
                  <span>Updated 2 sec ago</span>
                </div>
              </div>
              <div className="db-live-pill">
                <div className="db-live-dot" />
                <span>Live</span>
              </div>
            </div>
            <div className="db-lines-row">
              {lines.map((line, i) => (
                <div key={i} className="db-line-col">
                  {i > 0 && <div className="db-line-sep" />}
                  <div className="db-line-inner">
                    <div className="db-line-info">
                      <div className="db-line-name-row">
                        <div className="db-dot" style={{ background: line.dot }} />
                        <span className="db-line-name">{line.name}</span>
                      </div>
                      <span className="db-line-type">{line.type}</span>
                    </div>
                    <div
                      className="db-status-box"
                      style={{ background: line.bg, cursor: 'pointer' }}
                      onClick={() => navigate(`/dashboard/event/${i + 1}`)}
                    >
                      <div>
                        <p className="db-status-label">{line.status}</p>
                        <p className="db-status-value" style={{ color: line.color }}>{line.value}</p>
                      </div>
                      <span style={{ color: line.color }}><IconChevronRight /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics + Active Alerts */}
          <div className="db-mid-row">
            <div className="db-card db-metrics-card">
              <div className="db-card-header">
                <p className="db-card-title">Key Metrics</p>
              </div>
              <div className="db-metrics-row">
                {metrics.map((m, i) => (
                  <div key={m.label} className="db-metric-col">
                    {i > 0 && <div className="db-metric-sep" />}
                    <div className="db-metric">
                      <p className="db-metric-label">{m.label}</p>
                      <div className="db-metric-body">
                        <p className="db-metric-value" style={{ color: m.color }}>{m.value}</p>
                        <div className="db-bar-track">
                          <div
                            className="db-bar-fill"
                            style={{ width: m.barWidth, background: m.barColor, opacity: m.dimBar ? 0.5 : 1, animationDelay: `${i * 0.15}s` }}
                          />
                        </div>
                        <p className="db-metric-time">{m.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="db-card db-alerts-card">
              <div className="db-card-header">
                <div className="db-alerts-hl">
                  <p className="db-card-title">Active Alerts</p>
                  <div className="db-count-pill">2</div>
                </div>
                <button className="db-view-all-btn">
                  View all alerts <IconChevronRight />
                </button>
              </div>
              <div className="db-alerts-list">
                {alerts.map((a, i) => (
                  <div key={i} className="db-alert" style={{ background: a.bg, borderColor: a.border }}>
                    <div className="db-alert-left">
                      <AlertIcon color={a.color} />
                      <div className="db-alert-info">
                        <p className="db-alert-title">{a.title}</p>
                        <div className="db-alert-meta">
                          <span>{a.line}</span>
                          <span>{a.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="db-details-btn">View details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Timeline */}
          <div className="db-card">
            <div className="db-card-header">
              <div className="db-timeline-hl">
                <p className="db-card-title">Live Timeline</p>
                <div className="db-today-pill">Today</div>
              </div>
              <div className="db-line-select-wrap" ref={lineDropRef}>
                <button className="db-line-select" onClick={() => setLineDropOpen(o => !o)}>
                  {selectedLine} <IconChevronDown />
                </button>
                {lineDropOpen && (
                  <div className="db-line-dropdown">
                    {lineOptions.map(opt => (
                      <div
                        key={opt}
                        className={`db-line-drop-item${selectedLine === opt ? ' db-line-drop-item--active' : ''}`}
                        onClick={() => { setSelectedLine(opt); setLineDropOpen(false) }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="db-timeline-body">
              <div className="db-time-labels">
                {timeLabels.map((t, i) => <span key={i}>{t}</span>)}
              </div>
              {timelinesData.filter(d => d.line === selectedLine).map(data => (
                <TimelineChart key={data.line} data={data} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
