import { useState, useEffect } from 'react'
import { X, Plus, Clock, Trash2, ChevronDown, Check } from 'lucide-react'
import { useToast } from './Toast.jsx'
import './ScheduleDrawer.css'

function generateTimes() {
  const times = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const period = h < 12 ? 'AM' : 'PM'
      const hour = h === 0 ? 12 : h > 12 ? h - 12 : h
      const minute = m.toString().padStart(2, '0')
      times.push(`${hour}:${minute} ${period}`)
    }
  }
  return times
}

const allTimes = generateTimes()

const supervisors = [
  'Carl Wilson',
  'Maria Gonzalez',
  'James Okafor',
  'Priya Nair',
  'Tom Eriksson',
  'Aisha Mbeki',
]

const defaultShifts = [
  { id: 1, start: '6:00 AM', end: '9:00 PM' },
  { id: 2, start: '6:00 AM', end: '9:00 PM' },
  { id: 3, start: '6:00 AM', end: '9:00 PM' },
]

const defaultBreaks = [
  { id: 1, start: '6:00 AM', end: '9:00 PM' },
  { id: 2, start: '6:00 AM', end: '9:00 PM' },
  { id: 3, start: '6:00 AM', end: '9:00 PM' },
]

function TimeCol({ label, value, onChange }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div className="dr-time-col">
      <span className="dr-field-label">{label}</span>
      <div className="dr-time-picker">
        <div
          className="dr-time-field"
          onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        >
          <span className="dr-time-value">{value}</span>
          <Clock size={20} className="dr-clock-icon" />
        </div>
        {open && (
          <div className="dr-time-list">
            {allTimes.map(t => (
              <div
                key={t}
                className={`dr-time-item${value === t ? ' dr-time-item--active' : ''}`}
                onClick={e => { e.stopPropagation(); onChange(t); setOpen(false) }}
              >
                {t}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TimeRow({ label, item, onChange, onDelete }) {
  return (
    <div className="dr-time-row">
      <span className="dr-time-label">{label}</span>
      <TimeCol
        label="Start Time"
        value={item.start}
        onChange={v => onChange({ ...item, start: v })}
      />
      <TimeCol
        label="End Time"
        value={item.end}
        onChange={v => onChange({ ...item, end: v })}
      />
      <button className="dr-delete-btn" onClick={onDelete} aria-label="Delete">
        <Trash2 size={20} />
      </button>
    </div>
  )
}

export default function ScheduleDrawer({ line, onClose }) {
  const toast = useToast()
  const [lineName, setLineName] = useState(line?.type ?? '')
  const [shifts, setShifts] = useState(defaultShifts)
  const [breaks, setBreaks] = useState(defaultBreaks)
  const [supervisor, setSupervisor] = useState('Carl Wilson')
  const [supervisorOpen, setSupervisorOpen] = useState(false)

  useEffect(() => {
    if (!supervisorOpen) return
    const close = () => setSupervisorOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [supervisorOpen])

  const addShift = () =>
    setShifts(s => [...s, { id: Date.now(), start: '6:00 AM', end: '9:00 PM' }])
  const updateShift = (id, updated) =>
    setShifts(s => s.map(sh => sh.id === id ? updated : sh))
  const deleteShift = id =>
    setShifts(s => s.filter(sh => sh.id !== id))

  const addBreak = () =>
    setBreaks(b => [...b, { id: Date.now(), start: '6:00 AM', end: '9:00 PM' }])
  const updateBreak = (id, updated) =>
    setBreaks(b => b.map(br => br.id === id ? updated : br))
  const deleteBreak = id =>
    setBreaks(b => b.filter(br => br.id !== id))

  return (
    <>
      <div className="dr-backdrop" onClick={onClose} />

      <div className="dr-panel">

        <button className="dr-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="dr-body">

          <div className="dr-header">
            <p className="dr-title">{line?.isNew ? 'New Line' : 'Edit Line'}</p>
            <p className="dr-subtitle">Configure your facility schedule. This helps us accurately identify the status</p>
          </div>

          <div className="dr-field-group">
            <label className="dr-label">Line Name</label>
            <input
              className="dr-input"
              value={lineName}
              onChange={e => setLineName(e.target.value)}
              placeholder="Shorting Line"
            />
          </div>

          <div className="dr-field-group">
            <label className="dr-label">Supervisor</label>
            <div className="dr-select-container">
              <div
                className="dr-select-wrap"
                onClick={e => { e.stopPropagation(); setSupervisorOpen(o => !o) }}
              >
                <span className="dr-select-val dr-select-val--selected">{supervisor}</span>
                <ChevronDown size={20} className="dr-select-icon" />
              </div>
              {supervisorOpen && (
                <div className="dr-select-list">
                  {supervisors.map(name => (
                    <div
                      key={name}
                      className={`dr-select-item${supervisor === name ? ' dr-select-item--active' : ''}`}
                      onClick={e => { e.stopPropagation(); setSupervisor(name); setSupervisorOpen(false) }}
                    >
                      <span>{name}</span>
                      {supervisor === name && <Check size={16} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dr-section">
            <div className="dr-section-header">
              <div className="dr-step-num">1</div>
              <div className="dr-section-info">
                <p className="dr-section-title">Configure Shifts</p>
                <p className="dr-section-sub">Add your operating shifts for each day</p>
              </div>
              <button className="dr-add-btn" onClick={addShift} aria-label="Add shift">
                <Plus size={24} />
              </button>
            </div>
            {shifts.map((sh, i) => (
              <div key={sh.id}>
                <div className="dr-row-divider" />
                <TimeRow
                  label={`Shift ${i + 1}`}
                  item={sh}
                  onChange={updated => updateShift(sh.id, updated)}
                  onDelete={() => deleteShift(sh.id)}
                />
              </div>
            ))}
          </div>

          <div className="dr-section">
            <div className="dr-section-header">
              <div className="dr-step-num">2</div>
              <div className="dr-section-info">
                <p className="dr-section-title">Add Breaks</p>
                <p className="dr-section-sub">Add scheduled breaks for each day</p>
              </div>
              <button className="dr-add-btn" onClick={addBreak} aria-label="Add break">
                <Plus size={24} />
              </button>
            </div>
            {breaks.map((br, i) => (
              <div key={br.id}>
                <div className="dr-row-divider" />
                <TimeRow
                  label={`Break ${i + 1}`}
                  item={br}
                  onChange={updated => updateBreak(br.id, updated)}
                  onDelete={() => deleteBreak(br.id)}
                />
              </div>
            ))}
          </div>

        </div>

        <div className="dr-footer">
          <div className="dr-footer-left">
            <button className="dr-delete-line-btn">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
          <div className="dr-footer-right">
            <button className="dr-cancel-btn" onClick={onClose}>Cancel</button>
            <button className="dr-save-btn" onClick={() => { toast({ message: 'Changes saved successfully' }); onClose() }}>Save Changes</button>
          </div>
        </div>

      </div>
    </>
  )
}
