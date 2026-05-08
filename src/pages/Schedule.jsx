import { useState } from 'react'
import { Calendar } from 'lucide-react'

const IconCalendarCheckSolid = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6.5 1.5V4.5M13.5 1.5V4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="1.5" y="3" width="17" height="15.5" rx="2.5" fill="currentColor"/>
    <path d="M1.5 7.5H18.5" stroke="var(--primary,#3a5486)" strokeWidth="1"/>
    <path d="M6.5 12.5L9 15L13.5 10.5" stroke="var(--primary,#3a5486)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
import Sidebar from '../components/Sidebar.jsx'
import ScheduleDrawer from '../components/ScheduleDrawer.jsx'
import './Schedule.css'

const lines = [
  {
    name: 'Line 1', type: 'Shorting Line',
    dot: 'green',
    status: 'Uptime',
    statusBg: 'var(--soft-green,#f0fdf4)', statusBorder: 'var(--border-green,#b9f8cf)', statusColor: 'var(--green-color,#00a63e)',
    schedule: 'Mond-Sun', hours: '6:00 AM - 2:00 PM',
    shifts: 1, breaks: 2,
    updateDate: 'May 15, 2026', updateTime: '10:30 AM',
  },
  {
    name: 'Line 2', type: 'Paper Line',
    dot: 'red',
    status: 'Downtime',
    statusBg: 'var(--soft-red,#fef2f2)', statusBorder: 'var(--border-red,#f5dddd)', statusColor: 'var(--red-color,#e2454c)',
    schedule: 'Mond-Sun', hours: '6:00 AM - 2:00 PM',
    shifts: 1, breaks: 2,
    updateDate: 'May 15, 2026', updateTime: '10:30 AM',
  },
  {
    name: 'Line 3', type: 'Plastic Line',
    dot: 'green',
    status: 'Empty Belt',
    statusBg: 'var(--soft-yellow,#fefce8)', statusBorder: 'var(--border-yellow,#ede9bd)', statusColor: 'var(--yellow-color,#d08700)',
    schedule: 'Mond-Sun', hours: '6:00 AM - 2:00 PM',
    shifts: 1, breaks: 2,
    updateDate: 'May 15, 2026', updateTime: '10:30 AM',
  },
  {
    name: 'Line 4', type: 'Metal Line',
    dot: 'gray',
    status: 'Planned Stop',
    statusBg: 'var(--muted,#f5f5f5)', statusBorder: 'var(--border-token,#d2d2d2)', statusColor: 'var(--foreground,#121212)',
    schedule: 'Mond-Sun', hours: '6:00 AM - 2:00 PM',
    shifts: 1, breaks: 2,
    updateDate: 'May 15, 2026', updateTime: '10:30 AM',
  },
]

const dotColor = { green: '#00a63e', red: '#e2454c', gray: '#d2d2d2' }

export default function Schedule() {
  const [editingLine, setEditingLine] = useState(null)

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="sch-main">

        {/* Header */}
        <div className="sch-header">
          <div className="sch-header-left">
            <h1 className="sch-title">Schedule</h1>
            <p className="sch-subtitle">View and manage schedules for all lines</p>
          </div>
          <div className="sch-header-right">
            <span className="sch-date">May 15, 2026</span>
            <button className="sch-new-btn" onClick={() => setEditingLine({ isNew: true })}>
              New Line <IconCalendarCheckSolid />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="sch-table-wrap">

          {/* Table header */}
          <div className="sch-thead">
            <span className="sch-col sch-col-line">Line</span>
            <span className="sch-col sch-col-status">Status</span>
            <span className="sch-col sch-col-schedule">Schedule</span>
            <span className="sch-col sch-col-shifts">Shifts</span>
            <div className="sch-col sch-col-breaks">
              <span>Breaks</span>
              <span className="sch-col-sub">(Per Shift)</span>
            </div>
            <span className="sch-col sch-col-update">Last Update</span>
            <span className="sch-col sch-col-actions">Actions</span>
          </div>

          {/* Table rows */}
          {lines.map((line, i) => (
            <div key={line.name} className={`sch-row${i > 0 ? ' sch-row--border' : ''}`}>

              {/* Line */}
              <div className="sch-col sch-col-line">
                <div className="sch-line-name-row">
                  <span className="sch-dot" style={{ background: dotColor[line.dot] }} />
                  <span className="sch-line-name">{line.name}</span>
                </div>
                <div className="sch-line-name-row sch-line-type-row">
                  <span className="sch-line-type">{line.type}</span>
                </div>
              </div>

              {/* Status */}
              <div className="sch-col sch-col-status">
                <span
                  className="sch-status-badge"
                  style={{ background: line.statusBg, borderColor: line.statusBorder, color: line.statusColor }}
                >
                  {line.status}
                </span>
              </div>

              {/* Schedule */}
              <div className="sch-col sch-col-schedule">
                <div className="sch-sched-name">
                  <Calendar size={18} style={{ opacity: 0.7, flexShrink: 0 }} />
                  <span className="sch-sched-days">{line.schedule}</span>
                </div>
                <span className="sch-sched-hours">{line.hours}</span>
              </div>

              {/* Shifts */}
              <div className="sch-col sch-col-shifts">
                <span className="sch-cell-val">{line.shifts}</span>
              </div>

              {/* Breaks */}
              <div className="sch-col sch-col-breaks">
                <span className="sch-cell-val">{line.breaks}</span>
              </div>

              {/* Last Update */}
              <div className="sch-col sch-col-update">
                <span className="sch-update-date">{line.updateDate}</span>
                <span className="sch-update-time">{line.updateTime}</span>
              </div>

              {/* Actions */}
              <div className="sch-col sch-col-actions">
                <button className="sch-edit-btn" onClick={() => setEditingLine(line)}>Edit...</button>
              </div>

            </div>
          ))}
        </div>

      </main>

      {editingLine && (
        <ScheduleDrawer line={editingLine} onClose={() => setEditingLine(null)} />
      )}
    </div>
  )
}
