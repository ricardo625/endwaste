import { useState } from 'react'

const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconCalendarCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconTrash = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 5V3H12V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 5L7 17H13L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6.5V10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function ButtonsSection() {
  return (
    <div className="comp-section">
      <h3 className="comp-section-title">Buttons</h3>
      <div className="comp-row">
        <div className="comp-item">
          <span className="comp-label">Secondary</span>
          <button className="btn btn-secondary">Next <IconChevronRight /></button>
        </div>
        <div className="comp-item">
          <span className="comp-label">Primary</span>
          <button className="btn btn-primary">New Line <IconCalendarCheck /></button>
        </div>
        <div className="comp-item">
          <span className="comp-label">Destructive</span>
          <button className="btn btn-destructive"><IconTrash /> Delete</button>
        </div>
        <div className="comp-item">
          <span className="comp-label">Link</span>
          <button className="btn btn-link"><IconArrowLeft /> Back to Dashboard</button>
        </div>
        <div className="comp-item">
          <span className="comp-label">Link (disabled)</span>
          <button className="btn btn-link btn-link-disabled" disabled><IconArrowLeft /> Back to Dashboard</button>
        </div>
      </div>
    </div>
  )
}

function BadgesSection() {
  return (
    <div className="comp-section">
      <h3 className="comp-section-title">Badges</h3>
      <div className="comp-row">
        <div className="comp-item">
          <span className="comp-label">Green</span>
          <span className="badge badge-green">Uptime</span>
        </div>
        <div className="comp-item">
          <span className="comp-label">Red</span>
          <span className="badge badge-red">Downtime</span>
        </div>
        <div className="comp-item">
          <span className="comp-label">Yellow</span>
          <span className="badge badge-yellow">Empty Belt</span>
        </div>
        <div className="comp-item">
          <span className="comp-label">Neutral</span>
          <span className="badge badge-neutral">Planned Stop</span>
        </div>
      </div>
    </div>
  )
}

function DropdownsSection() {
  const [openSmall, setOpenSmall] = useState(false)
  const [smallSelected, setSmallSelected] = useState('Machine failure')
  const [openLarge, setOpenLarge] = useState(false)
  const [largeSelected, setLargeSelected] = useState('All Lines')

  const stopReasons = ['Machine failure', 'Jam / blockage', 'Operator issue']
  const lines = ['Line 1', 'Line 2', 'Line 3']

  return (
    <div className="comp-section">
      <h3 className="comp-section-title">Dropdowns</h3>
      <div className="comp-row comp-row-top">
        <div className="comp-item">
          <span className="comp-label">Small (pill)</span>
          <div className="dropdown">
            <button className="dropdown-trigger-pill" onClick={() => setOpenSmall(o => !o)}>
              {smallSelected}
              <IconChevronDown />
            </button>
            {openSmall && (
              <div className="dropdown-list">
                {stopReasons.map(r => (
                  <div
                    key={r}
                    className={`dropdown-item${r === smallSelected ? ' dropdown-item-active' : ''}`}
                    onClick={() => { setSmallSelected(r); setOpenSmall(false) }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="comp-item">
          <span className="comp-label">Large (rect)</span>
          <div className="dropdown">
            <button className="dropdown-trigger-rect" onClick={() => setOpenLarge(o => !o)}>
              {largeSelected}
              <IconChevronDown />
            </button>
            {openLarge && (
              <div className="dropdown-list">
                {lines.map(l => (
                  <div
                    key={l}
                    className={`dropdown-item${l === largeSelected ? ' dropdown-item-active' : ''}`}
                    onClick={() => { setLargeSelected(l); setOpenLarge(false) }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarSection() {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(today)
  const [viewing, setViewing] = useState({ month: today.getMonth(), year: today.getFullYear() })

  const firstDay = new Date(viewing.year, viewing.month, 1).getDay()
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate()
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
  while (cells.length % 7 !== 0) cells.push(null)

  const isSelected = (d) =>
    d !== null &&
    d === selected.getDate() &&
    viewing.month === selected.getMonth() &&
    viewing.year === selected.getFullYear()

  const formatDate = (d) => `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`

  const prevMonth = () => setViewing(v => ({
    month: v.month === 0 ? 11 : v.month - 1,
    year: v.month === 0 ? v.year - 1 : v.year,
  }))

  const nextMonth = () => setViewing(v => ({
    month: v.month === 11 ? 0 : v.month + 1,
    year: v.month === 11 ? v.year + 1 : v.year,
  }))

  return (
    <div className="comp-section">
      <h3 className="comp-section-title">Date Picker</h3>
      <div className="comp-row comp-row-top">
        <div className="comp-item">
          <span className="comp-label">Calendar</span>
          <div className="datepicker">
            <button className="dropdown-trigger-rect" onClick={() => setOpen(o => !o)}>
              {formatDate(selected)}
              <IconCalendar />
            </button>
            {open && (
              <div className="calendar-popup">
                <div className="calendar-header">
                  <button className="calendar-nav" onClick={prevMonth}>‹</button>
                  <span className="calendar-month-year">{MONTHS[viewing.month]} {viewing.year}</span>
                  <button className="calendar-nav" onClick={nextMonth}>›</button>
                </div>
                <div className="calendar-divider" />
                <div className="calendar-grid">
                  {DAYS.map(d => <div key={d} className="calendar-day-name">{d}</div>)}
                  {cells.map((d, i) => (
                    <button
                      key={i}
                      disabled={d === null}
                      className={`calendar-date${d === null ? ' calendar-date-empty' : ''}${isSelected(d) ? ' calendar-date-selected' : ''}`}
                      onClick={() => {
                        if (d !== null) {
                          setSelected(new Date(viewing.year, viewing.month, d))
                          setOpen(false)
                        }
                      }}
                    >
                      {d ?? ''}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InputsSection() {
  const [textVal, setTextVal] = useState('')
  const [timeVal, setTimeVal] = useState('6:00 AM')

  return (
    <div className="comp-section">
      <h3 className="comp-section-title">Inputs</h3>
      <div className="comp-row comp-row-top">

        <div className="comp-item">
          <span className="comp-label">Text</span>
          <div className="inp-wrap">
            <label className="inp-label">Line Name</label>
            <div className="inp-field">
              <input
                className="inp-text"
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                placeholder="Add a name"
              />
            </div>
          </div>
        </div>

        <div className="comp-item">
          <span className="comp-label">Select</span>
          <div className="inp-wrap">
            <label className="inp-label">Supervisor</label>
            <div className="inp-field inp-field-select">
              <span className="inp-placeholder">Select a supervisor</span>
              <IconChevronDown />
            </div>
          </div>
        </div>

        <div className="comp-item">
          <span className="comp-label">Time</span>
          <div className="inp-wrap">
            <label className="inp-label">Start Time</label>
            <div className="inp-field">
              <input
                className="inp-text"
                value={timeVal}
                onChange={e => setTimeVal(e.target.value)}
              />
              <IconClock />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function ComponentsTab() {
  return (
    <div className="comp-page">
      <ButtonsSection />
      <BadgesSection />
      <InputsSection />
      <DropdownsSection />
      <CalendarSection />
    </div>
  )
}
