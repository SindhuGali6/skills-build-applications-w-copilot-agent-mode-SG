import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' }, { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' }, { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' }, { label: 'Workouts', path: '/workouts' },
]

function App() {
  return <div className="app-shell"><aside className="sidebar"><div className="brand-mark"><span>O</span> OCTOFIT</div><p className="sidebar-caption">Team movement, made visible.</p><nav aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.path} to={item.path} end={item.path === '/'}><span className="nav-dot" aria-hidden="true" />{item.label}</NavLink>)}</nav><div className="sidebar-foot">API STATUS <strong>● ONLINE</strong></div></aside><main className="main-content"><header className="topbar"><div><span className="eyebrow">OCTOFIT TRACKER</span><h1>Move with purpose.</h1></div><div className="date-chip">SEPTEMBER 2026 <span>↗</span></div></header><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main></div>
}

function Overview() {
  return <section className="overview-page"><div className="intro-panel"><span className="eyebrow">TODAY'S FOCUS</span><h2>Small steps.<br /><em>Strong momentum.</em></h2><p>Track the work, celebrate the consistency, and keep your team moving forward.</p><NavLink className="primary-action" to="/activities">Log an activity <span>→</span></NavLink></div><div className="overview-grid"><NavLink to="/leaderboard" className="overview-tile"><span className="tile-number">01</span><strong>Leaderboard</strong><span>See who is setting the pace →</span></NavLink><NavLink to="/workouts" className="overview-tile warm"><span className="tile-number">02</span><strong>Workouts</strong><span>Find your next challenge →</span></NavLink></div></section>
}

export default App