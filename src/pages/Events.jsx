import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Calendar, ChevronDown, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const IconDownloadSolid = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.5V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M5.5 8L10 13L14.5 8" fill="currentColor"/>
    <path d="M5.5 8L10 13L14.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 14.5H18V17.5C18 18.0523 17.5523 18.5 17 18.5H3C2.44772 18.5 2 18.0523 2 17.5V14.5Z" fill="currentColor"/>
  </svg>
)
import Sidebar from '../components/Sidebar.jsx'
import './Events.css'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

function formatDate(d) {
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`
}

function CalendarFilter({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [viewing, setViewing] = useState({ month: value.getMonth(), year: value.getFullYear() })
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  const firstDay    = new Date(viewing.year, viewing.month, 1).getDay()
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate()
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
  while (cells.length % 7 !== 0) cells.push(null)

  const isSelected = d => d !== null && d === value.getDate() && viewing.month === value.getMonth() && viewing.year === value.getFullYear()

  const prev = () => setViewing(v => v.month === 0  ? { month: 11, year: v.year - 1 } : { month: v.month - 1, year: v.year })
  const next = () => setViewing(v => v.month === 11 ? { month: 0,  year: v.year + 1 } : { month: v.month + 1, year: v.year })

  return (
    <div className="ev-filter-wrap" ref={ref}>
      <button className="ev-filter-btn" onClick={() => setOpen(o => !o)}>
        <Calendar size={18} style={{ opacity: 0.6 }} />
        <span>{formatDate(value)}</span>
      </button>
      {open && (
        <div className="ev-calendar-popup">
          <div className="ev-cal-header">
            <button className="ev-cal-nav" onClick={prev}><ChevronLeft size={16} /></button>
            <span className="ev-cal-month">{MONTHS[viewing.month]} {viewing.year}</span>
            <button className="ev-cal-nav" onClick={next}><ChevronRight size={16} /></button>
          </div>
          <div className="ev-cal-divider" />
          <div className="ev-cal-grid">
            {DAYS.map(d => <div key={d} className="ev-cal-day-name">{d}</div>)}
            {cells.map((d, i) => (
              <button
                key={i}
                disabled={d === null}
                className={`ev-cal-date${d === null ? ' ev-cal-date--empty' : ''}${isSelected(d) ? ' ev-cal-date--selected' : ''}`}
                onClick={() => { if (d !== null) { onChange(new Date(viewing.year, viewing.month, d)); setOpen(false) } }}
              >
                {d ?? ''}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const filterOptions = {
  lines:           ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
  classifications: ['Machine failure', 'Jam / blockage', 'Operator issue', 'Break', 'Shift change', 'Staff meeting', 'Maintenance window', 'Sensor glitch', 'Very short stop', 'Test / calibration'],
  statuses:        ['Uptime', 'Downtime', 'Empty Belt', 'Planned Stop'],
}

function FilterDropdown({ label, options, value, onChange, open, onToggle }) {
  useEffect(() => {
    if (!open) return
    const close = () => onToggle(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open, onToggle])

  return (
    <div className="ev-filter-wrap">
      <button
        className={`ev-filter-btn${value ? ' ev-filter-btn--active' : ''}`}
        onClick={e => { e.stopPropagation(); onToggle(!open) }}
      >
        <span>{value || label}</span>
        <ChevronDown size={20} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div className="ev-dropdown">
          {options.map(opt => (
            <div
              key={opt}
              className={`ev-dropdown-item${value === opt ? ' ev-dropdown-item--active' : ''}`}
              onClick={e => { e.stopPropagation(); onChange(value === opt ? null : opt); onToggle(false) }}
            >
              <span>{opt}</span>
              {value === opt && <Check size={15} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const dotColor = { red: '#e2454c', green: '#00a63e', yellow: '#d08700', gray: '#d2d2d2' }
const dotLabel = { red: 'Downtime', green: 'Uptime', yellow: 'Empty Belt', gray: 'Planned Stop' }

const events = [
  {
    dot: 'red',
    startTime: '10:30 AM', startDate: 'May 15, 2026',
    endTime: '10:30 AM', endDate: 'May 15, 2026',
    lineName: 'Line 1', lineType: 'Shorting Line',
    classification: { label: 'Machine failure', bg: 'var(--soft-red,#fef2f2)', border: 'var(--border-red,#f5dddd)', color: 'var(--red-color,#e2454c)' },
    duration: '18 min',
    resolved: null,
  },
  {
    dot: 'green',
    startTime: '10:30 AM', startDate: 'May 15, 2026',
    endTime: '10:30 AM', endDate: 'May 15, 2026',
    lineName: 'Line 2', lineType: 'Paper Line',
    classification: null,
    duration: '16 min',
    resolved: { label: 'Resolved', bg: 'var(--soft-green,#f0fdf4)', border: 'var(--border-green,#b9f8cf)', color: 'var(--green-color,#00a63e)' },
  },
  {
    dot: 'yellow',
    startTime: '10:30 AM', startDate: 'May 15, 2026',
    endTime: '10:30 AM', endDate: 'May 15, 2026',
    lineName: 'Line 3', lineType: 'Plastic Line',
    classification: { label: 'Sensor glitch', bg: 'var(--soft-yellow,#fefce8)', border: 'var(--border-yellow,#ede9bd)', color: 'var(--yellow-color,#d08700)' },
    duration: '2 hours',
    resolved: { label: 'Resolved', bg: 'var(--soft-green,#f0fdf4)', border: 'var(--border-green,#b9f8cf)', color: 'var(--green-color,#00a63e)' },
  },
  {
    dot: 'gray',
    startTime: '10:30 AM', startDate: 'May 15, 2026',
    endTime: '10:30 AM', endDate: 'May 15, 2026',
    lineName: 'Line 4', lineType: 'Metal Line',
    classification: { label: 'Shift change', bg: 'var(--muted,#f5f5f5)', border: 'var(--border-token,#d2d2d2)', color: 'var(--foreground,#121212)' },
    duration: '10 hours',
    resolved: { label: 'Resolved', bg: 'var(--soft-green,#f0fdf4)', border: 'var(--border-green,#b9f8cf)', color: 'var(--green-color,#00a63e)' },
  },
]

export default function Events() {
  const navigate = useNavigate()
  const [openFilter, setOpenFilter] = useState(null)
  const [filterDate, setFilterDate]         = useState(new Date(2026, 4, 15))
  const [filterLine, setFilterLine]         = useState(null)
  const [filterClass, setFilterClass]       = useState(null)
  const [filterStatus, setFilterStatus]     = useState(null)

  const clearFilters = () => { setFilterLine(null); setFilterClass(null); setFilterStatus(null) }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="ev-main">

        {/* Header */}
        <div className="ev-header">
          <div className="ev-header-left">
            <h1 className="ev-title">Events</h1>
            <p className="ev-subtitle">View and manage schedules for all lines</p>
          </div>
          <button className="ev-download-btn">
            Download CSV <IconDownloadSolid />
          </button>
        </div>

        {/* Filters */}
        <div className="ev-filters">
          <div className="ev-search-wrap">
            <Search size={20} className="ev-search-icon" />
            <input
              className="ev-search-input"
              type="text"
              placeholder="Search Events"
            />
          </div>
          <CalendarFilter value={filterDate} onChange={setFilterDate} />
          <FilterDropdown
            label="All Lines"
            options={filterOptions.lines}
            value={filterLine}
            onChange={setFilterLine}
            open={openFilter === 'lines'}
            onToggle={v => setOpenFilter(v ? 'lines' : null)}
          />
          <FilterDropdown
            label="All Classifications"
            options={filterOptions.classifications}
            value={filterClass}
            onChange={setFilterClass}
            open={openFilter === 'classifications'}
            onToggle={v => setOpenFilter(v ? 'classifications' : null)}
          />
          <FilterDropdown
            label="All Statuses"
            options={filterOptions.statuses}
            value={filterStatus}
            onChange={setFilterStatus}
            open={openFilter === 'statuses'}
            onToggle={v => setOpenFilter(v ? 'statuses' : null)}
          />
          <button className="ev-clear-btn" onClick={clearFilters}>Clear Filter</button>
        </div>

        {/* Table */}
        <div className="ev-table-wrap">

          {/* Table header */}
          <div className="ev-thead">
            <span className="ev-col ev-col-dot">Status</span>
            <span className="ev-col ev-col-start">Start Time</span>
            <span className="ev-col ev-col-end">Start End</span>
            <span className="ev-col ev-col-line">Line</span>
            <span className="ev-col ev-col-class">Classification</span>
            <span className="ev-col ev-col-duration">Classification</span>
            <span className="ev-col ev-col-status">Situation</span>
            <span className="ev-col ev-col-actions">Actions</span>
          </div>

          {/* Rows */}
          {events.map((ev, i) => (
            <div key={i} className={`ev-row${i > 0 ? ' ev-row--border' : ''}`}>

              {/* Status dot */}
              <div className="ev-col ev-col-dot">
                <span className="ev-dot" style={{ background: dotColor[ev.dot] }} data-label={dotLabel[ev.dot]} />
              </div>

              {/* Start Time */}
              <div className="ev-col ev-col-start">
                <span className="ev-time-bold">{ev.startTime}</span>
                <span className="ev-time-sub">{ev.startDate}</span>
              </div>

              {/* Start End */}
              <div className="ev-col ev-col-end">
                <span className="ev-time-bold">{ev.endTime}</span>
                <span className="ev-time-sub">{ev.endDate}</span>
              </div>

              {/* Line */}
              <div className="ev-col ev-col-line">
                <span className="ev-line-name">{ev.lineName}</span>
                <span className="ev-line-type">{ev.lineType}</span>
              </div>

              {/* Classification */}
              <div className="ev-col ev-col-class">
                {ev.classification ? (
                  <span
                    className="ev-badge"
                    style={{ background: ev.classification.bg, borderColor: ev.classification.border, color: ev.classification.color }}
                  >
                    {ev.classification.label}
                  </span>
                ) : (
                  <span className="ev-dash">-</span>
                )}
              </div>

              {/* Duration */}
              <div className="ev-col ev-col-duration">
                <span className="ev-duration">{ev.duration}</span>
              </div>

              {/* Resolved status */}
              <div className="ev-col ev-col-status">
                {ev.resolved ? (
                  <span
                    className="ev-badge"
                    style={{ background: ev.resolved.bg, borderColor: ev.resolved.border, color: ev.resolved.color }}
                  >
                    {ev.resolved.label}
                  </span>
                ) : (
                  <span className="ev-dash">-</span>
                )}
              </div>

              {/* Actions */}
              <div className="ev-col ev-col-actions">
                <button className="ev-view-btn" onClick={() => navigate(`/dashboard/event/${i + 1}`)}>View</button>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
