import { useState } from 'react'
import ComponentsTab from './ComponentsTab.jsx'
import './Guidelines.css'

const groups = [
  {
    label: 'Base',
    tokens: [
      { name: 'background', value: '#ffffff', border: true },
      { name: 'soft-background', value: '#fdfdfd', border: true },
      { name: 'foreground', value: '#121212' },
      { name: 'soft-foreground', value: '#121212b3' },
      { name: 'border', value: '#d2d2d2' },
      { name: 'border-input', value: '#d2d2d2' },
      { name: 'muted', value: '#f5f5f5' },
      { name: 'muted-foreground', value: '#121212' },
      { name: 'disabled', value: '#ababab' },
    ],
  },
  {
    label: 'Primary',
    tokens: [
      { name: 'primary', value: '#3a5486' },
      { name: 'primary-color', value: '#3a5486' },
      { name: 'primary-foreground', value: '#ffffff', border: true },
    ],
  },
  {
    label: 'Accent',
    tokens: [
      { name: 'accent', value: '#f2f4f7' },
      { name: 'accent-foreground', value: '#121212' },
    ],
  },
  {
    label: 'Green',
    tokens: [
      { name: 'green-color', value: '#00a63e' },
      { name: 'soft-green', value: '#f0fdf4' },
      { name: 'soft-green-foreground', value: '#00a63e' },
      { name: 'border-green', value: '#b9f8cf' },
    ],
  },
  {
    label: 'Red',
    tokens: [
      { name: 'red-color', value: '#e2454c' },
      { name: 'soft-red', value: '#fef2f2' },
      { name: 'soft-red-foreground', value: '#e2454c' },
      { name: 'border-red', value: '#f5dddd' },
      { name: 'destructive', value: '#e2454c' },
    ],
  },
  {
    label: 'Yellow',
    tokens: [
      { name: 'yellow-color', value: '#d08700' },
      { name: 'soft-yellow', value: '#fefce8' },
      { name: 'soft-yellow-foreground', value: '#d08700' },
      { name: 'border-yellow', value: '#ede9bd' },
    ],
  },
  {
    label: 'Blue',
    tokens: [
      { name: 'color-blue', value: '#155dfb' },
      { name: 'soft-blue', value: '#f4f7fe' },
      { name: 'soft-blue-foreground', value: '#155dfb' },
      { name: 'border-blue', value: '#c2d2f2' },
    ],
  },
]

function ColorSwatch({ name, value, border }) {
  return (
    <div className="swatch">
      <div
        className="swatch-color"
        style={{ backgroundColor: value, border: border ? '1px solid #d2d2d2' : 'none' }}
      />
      <div className="swatch-info">
        <span className="swatch-name">{name}</span>
        <span className="swatch-value">{value}</span>
      </div>
    </div>
  )
}

function ColorsTab() {
  return (
    <div className="token-groups">
      {groups.map((group) => (
        <div key={group.label} className="token-group">
          <h3 className="token-group-label">{group.label}</h3>
          <div className="swatch-grid">
            {group.tokens.map((token) => (
              <ColorSwatch key={token.name} {...token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: 'colors', label: 'Colors' },
  { id: 'components', label: 'Components' },
]

export default function Guidelines() {
  const [activeTab, setActiveTab] = useState('colors')

  return (
    <div className="guidelines">
      <div className="guidelines-header">
        <h1>Guidelines</h1>
        <p>Design tokens and component system for the EndWaste project.</p>
      </div>

      <div className="guidelines-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`guidelines-tab${activeTab === tab.id ? ' guidelines-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="guidelines-content">
        {activeTab === 'colors' && <ColorsTab />}
        {activeTab === 'components' && <ComponentsTab />}
      </div>
    </div>
  )
}
