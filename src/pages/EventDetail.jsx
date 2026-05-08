import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  AlertCircle,
  Calendar,
  ChevronDown,
  Check,
} from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import './EventDetail.css'

const timelineSteps = [
  { time: '10:42 AM', label: 'Started',    status: 'done',    color: 'var(--red-color,#e2454c)' },
  { time: '10:42 AM', label: 'Alert Sent', status: 'active',  color: 'var(--foreground,#121212)' },
  { time: '-',        label: 'Resolved',   status: 'pending', color: 'var(--border-token,#d2d2d2)' },
  { time: '-',        label: 'Classified', status: 'pending', color: 'var(--border-token,#d2d2d2)' },
]


const subOptions = {
  unplanned: ['Machine failure', 'Jam / blockage', 'Operator issue'],
  planned:   ['Break', 'Shift change', 'Staff meeting', 'Maintenance window'],
  not:       ['Sensor glitch', 'Very short stop', 'Test / calibration'],
}

export default function EventDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [classification, setClassification] = useState('unplanned')
  const [subSelections, setSubSelections] = useState({ unplanned: 'Machine failure', planned: null, not: null })
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    if (!openDropdown) return
    const close = () => setOpenDropdown(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [openDropdown])

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="ed-main">

        {/* Header */}
        <div className="ed-header">
          <div className="ed-header-left">
            <button className="ed-back-btn" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
            <div className="ed-title-row">
              <div className="ed-title-group">
                <h1 className="ed-title">Event Detail</h1>
                <span className="ed-type-badge">Downtime</span>
              </div>
              <div className="ed-meta-row">
                <span className="ed-meta">EVT-2405515-10242</span>
                <span className="ed-meta">Detected at 10:42 AM, May 15, 2025 by System</span>
              </div>
            </div>
          </div>
          <div className="ed-nav-btns">
            <button className="ed-nav-btn"><ChevronLeft size={18} /> Previous</button>
            <button className="ed-nav-btn">Next <ChevronRight size={18} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="ed-body">

          {/* Left column */}
          <div className="ed-col-main">

            {/* Info + Timeline card */}
            <div className="ed-card">
              <div className="ed-info-row">
                <div className="ed-info-line">
                  <div className="ed-line-name-row">
                    <span className="ed-dot ed-dot-red" />
                    <span className="ed-line-name">Line {id || 2}</span>
                  </div>
                  <div className="ed-line-name-row">
                    <span className="ed-line-sub">Paper Line</span>
                  </div>
                </div>

                <div className="ed-info-sep" />

                <div className="ed-info-stat">
                  <span className="ed-stat-label">Duration</span>
                  <span className="ed-stat-value ed-stat-red">18 min</span>
                  <span className="ed-stat-note">(and ongoing)</span>
                </div>

                <div className="ed-info-sep" />

                <div className="ed-info-stat">
                  <span className="ed-stat-label">Start Time</span>
                  <span className="ed-stat-value">10:42 AM</span>
                  <span className="ed-stat-label">May 15, 2026</span>
                </div>

                <div className="ed-info-sep" />

                <div className="ed-info-stat">
                  <span className="ed-stat-label">Current Impact</span>
                  <div className="ed-impact-row">
                    <BarChart2 size={22} color="var(--red-color,#e2454c)" />
                    <span className="ed-stat-value ed-stat-red">High</span>
                  </div>
                </div>
              </div>

              <div className="ed-h-sep" />

              <div className="ed-timeline-section">
                <div className="ed-card-header-plain">
                  <p className="ed-card-title">Event Timeline</p>
                  <p className="ed-card-sub">System detection over time (May 15, 2026)</p>
                </div>

                <div className="ed-timeline-wrap">
                  {timelineSteps.map((step, i) => (
                    <div key={step.label} className="ed-step-col">
                      <div className="ed-step-track">
                        {i > 0 && (
                          <div className={`ed-connector${step.status === 'pending' ? ' ed-connector-gray' : ' ed-connector-red'}`} />
                        )}
                        <div className={`ed-step-dot ed-step-dot--${step.status}`} />
                        {i < timelineSteps.length - 1 && (
                          <div className={`ed-connector${timelineSteps[i + 1].status === 'pending' ? ' ed-connector-gray' : ' ed-connector-red'}`} />
                        )}
                      </div>
                      <div className="ed-step-labels">
                        <span className="ed-step-time" style={{ color: step.color }}>{step.time}</span>
                        <span className="ed-step-label" style={{ color: step.color }}>{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ed-warning-banner">
                  <AlertCircle size={18} color="var(--red-color,#e2454c)" style={{ flexShrink: 0 }} />
                  <p>This event is still active. End time and duration will update automatically when resolved</p>
                </div>
              </div>
            </div>

            {/* Breakdown card */}
            <div className="ed-card ed-card--overflow">
              <div className="ed-card-header-border">
                <p className="ed-card-title">Breakdown</p>
              </div>
              <div className="ed-breakdown-body">
                <div className="ed-breakdown-table">
                  <div className="ed-breakdown-row">
                    <span className="ed-breakdown-key">Event type</span>
                    <span className="ed-breakdown-val">Downtime</span>
                  </div>
                  <div className="ed-breakdown-row">
                    <span className="ed-breakdown-key">Affected Line</span>
                    <span className="ed-breakdown-val">Line {id || 2} - Paper Line</span>
                  </div>
                  <div className="ed-breakdown-row">
                    <span className="ed-breakdown-key">Location</span>
                    <span className="ed-breakdown-val">Main Sorting Area - Section B</span>
                  </div>
                  <div className="ed-breakdown-row">
                    <span className="ed-breakdown-key">Description</span>
                    <span className="ed-breakdown-val">System detected no material movement on the belt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact card */}
            <div className="ed-card ed-card--overflow">
              <div className="ed-card-header-border">
                <p className="ed-card-title">Impact</p>
              </div>
              <div className="ed-impact-body">
                <div className="ed-impact-row-item">
                  <span className="ed-breakdown-key">Downtime</span>
                  <span className="ed-stat-value ed-stat-red">18 min</span>
                </div>
                <div className="ed-impact-row-item">
                  <span className="ed-breakdown-key">Places Impacted</span>
                  <span className="ed-breakdown-val">-</span>
                </div>
                <div className="ed-impact-row-item">
                  <span className="ed-breakdown-key">Est. Production Loss</span>
                  <span className="ed-breakdown-val">-</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right column — Classification */}
          <div className="ed-col-side">
            <div className="ed-card ed-card--overflow">
              <div className="ed-card-header-border">
                <p className="ed-card-title">Classification</p>
              </div>
              <div className="ed-class-body">

                {/* Options group */}
                <div className="ed-class-options-group">
                  {/* Unplanned Downtime */}
                  <div
                    className={`ed-class-option ed-class-option--first${classification === 'unplanned' ? ' ed-class-option--selected' : ''}`}
                    onClick={() => setClassification('unplanned')}
                  >
                    <div className="ed-class-icon-wrap">
                      <AlertCircle size={32} fill="var(--red-color,#e2454c)" color="white" strokeWidth={2} />
                    </div>
                    <div className="ed-class-text">
                      <span className="ed-class-label">Unplanned Downtime</span>
                      <div className="ed-sub-dropdown">
                        <button className="ed-class-dropdown" onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === 'unplanned' ? null : 'unplanned') }}>
                          {subSelections.unplanned || 'Select'} <ChevronDown size={16} />
                        </button>
                        {openDropdown === 'unplanned' && (
                          <div className="ed-dropdown-list">
                            {subOptions.unplanned.map(opt => (
                              <div key={opt} className={`ed-dropdown-item${subSelections.unplanned === opt ? ' ed-dropdown-item--active' : ''}`} onClick={e => { e.stopPropagation(); setSubSelections(s => ({ ...s, unplanned: opt })); setOpenDropdown(null) }}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {classification === 'unplanned' && <Check size={18} color="var(--foreground,#121212)" className="ed-class-check" />}
                  </div>

                  {/* Planned Stop */}
                  <div
                    className={`ed-class-option ed-class-option--middle${classification === 'planned' ? ' ed-class-option--selected' : ''}`}
                    onClick={() => setClassification('planned')}
                  >
                    <div className="ed-class-icon-circle-blue">
                      <Calendar size={24} color="var(--color-blue,#155dfb)" strokeWidth={1.5} />
                    </div>
                    <div className="ed-class-text">
                      <span className="ed-class-label">Planned Stop</span>
                      <div className="ed-sub-dropdown">
                        <button className="ed-class-dropdown" onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === 'planned' ? null : 'planned') }}>
                          {subSelections.planned || 'Select'} <ChevronDown size={16} />
                        </button>
                        {openDropdown === 'planned' && (
                          <div className="ed-dropdown-list">
                            {subOptions.planned.map(opt => (
                              <div key={opt} className={`ed-dropdown-item${subSelections.planned === opt ? ' ed-dropdown-item--active' : ''}`} onClick={e => { e.stopPropagation(); setSubSelections(s => ({ ...s, planned: opt })); setOpenDropdown(null) }}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {classification === 'planned' && <Check size={18} color="var(--foreground,#121212)" className="ed-class-check" />}
                  </div>

                  {/* Not downtime */}
                  <div
                    className={`ed-class-option ed-class-option--last${classification === 'not' ? ' ed-class-option--selected' : ''}`}
                    onClick={() => setClassification('not')}
                  >
                    <div className="ed-class-icon-wrap">
                      <div className="ed-radio-circle" />
                    </div>
                    <div className="ed-class-text">
                      <span className="ed-class-label">Not downtime</span>
                      <div className="ed-sub-dropdown">
                        <button className="ed-class-dropdown" onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === 'not' ? null : 'not') }}>
                          {subSelections.not || 'Select'} <ChevronDown size={16} />
                        </button>
                        {openDropdown === 'not' && (
                          <div className="ed-dropdown-list">
                            {subOptions.not.map(opt => (
                              <div key={opt} className={`ed-dropdown-item${subSelections.not === opt ? ' ed-dropdown-item--active' : ''}`} onClick={e => { e.stopPropagation(); setSubSelections(s => ({ ...s, not: opt })); setOpenDropdown(null) }}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {classification === 'not' && <Check size={18} color="var(--foreground,#121212)" className="ed-class-check" />}
                  </div>
                </div>

                <div className="ed-class-sep" />

                {/* Notes */}
                <div className="ed-notes-wrap">
                  <label className="ed-notes-label">Notes</label>
                  <div className="ed-notes-field">
                    <textarea
                      className="ed-notes-input"
                      placeholder="Add a name"
                      maxLength={250}
                    />
                    <span className="ed-notes-count">0/250</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
