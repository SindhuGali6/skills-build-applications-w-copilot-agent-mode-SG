import { useEffect, useState } from 'react'
import { displayName, fetchResource } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState(null); const [error, setError] = useState('')
  useEffect(() => { fetchResource(activitiesEndpoint).then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="MOVEMENT LOG" title="Activities" count={activities?.length}><div className="table-scroll"><table className="data-table"><thead><tr><th>Athlete</th><th>Type</th><th>Duration</th><th>Distance</th><th>Completed</th></tr></thead><tbody>{activities?.map((activity) => <tr key={activity._id}><td className="primary-text">{displayName(activity.user)}</td><td><span className="tag">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : '—'}</td><td className="secondary-text">{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div><Message loading={!activities && !error} error={error} empty={activities?.length === 0} /></ResourcePage>
}

export function ResourcePage({ eyebrow, title, count, children }) { return <section className="content-page"><div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{count !== undefined && <span className="record-count">{count} RECORDS</span>}</div>{children}</section> }
export function Message({ loading, error, empty }) { if (loading) return <p className="status-message">Loading records...</p>; if (error) return <p className="status-message error-message">{error}</p>; if (empty) return <p className="status-message">No records found.</p>; return null }
export default Activities