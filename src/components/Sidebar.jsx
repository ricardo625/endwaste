import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Bell,
  LayoutDashboard,
  Calendar,
  ListChecks,
  Settings2,
  MessageCircleQuestion,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import './Sidebar.css'

import imgAvatar from '../assets/avatar.png'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar${collapsed ? ' sidebar-collapsed' : ''}`}>

      {/* Profile */}
      <div className="sb-profile">
        <img className="sb-avatar" src={imgAvatar} alt="Andrew Smith" />
        {!collapsed && (
          <div className="sb-profile-text">
            <span className="sb-role">Product Manager</span>
            <span className="sb-name">Andrew Smith</span>
          </div>
        )}
      </div>

      <div className="sb-divider" />

      {/* Main nav */}
      <nav className="sb-nav">
        <span className="sb-section-title">Main</span>

        <NavLink to="/dashboard/notifications" data-tooltip="Notifications" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <Bell size={20} />
          {!collapsed && <span className="sb-link-label">Notifications</span>}
          {!collapsed && <span className="sb-badge">2</span>}
        </NavLink>

        <NavLink to="/dashboard" end data-tooltip="Dashboard" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <LayoutDashboard size={20} />
          {!collapsed && <span className="sb-link-label">Dashboard</span>}
        </NavLink>

        <NavLink to="/dashboard/schedule" data-tooltip="Schedule" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <Calendar size={20} />
          {!collapsed && <span className="sb-link-label">Schedule</span>}
        </NavLink>

<NavLink to="/dashboard/events" data-tooltip="Events" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <ListChecks size={20} />
          {!collapsed && <span className="sb-link-label">Events</span>}
        </NavLink>
      </nav>

      <div className="sb-divider" />

      {/* Settings nav */}
      <nav className="sb-nav sb-nav-grow">
        <span className="sb-section-title">Settings</span>
        <NavLink to="/dashboard/settings" data-tooltip="Settings" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <Settings2 size={20} />
          {!collapsed && <span className="sb-link-label">Settings</span>}
        </NavLink>
      </nav>

      {/* Bottom nav */}
      <nav className="sb-nav">
        <NavLink to="/dashboard/help" data-tooltip="Help" className={({ isActive }) => `sb-link${isActive ? ' sb-link-active' : ''}`}>
          <MessageCircleQuestion size={20} />
          {!collapsed && <span className="sb-link-label">Help</span>}
        </NavLink>
        <NavLink to="/dashboard/logout" data-tooltip="Logout Account" className="sb-link sb-link-logout">
          <LogOut size={20} />
          {!collapsed && <span className="sb-link-label">Logout Account</span>}
        </NavLink>
      </nav>

      {/* Collapse toggle */}
      <button
        className="sb-collapse-btn"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  )
}
