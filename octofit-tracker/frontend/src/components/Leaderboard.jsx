import { useEffect, useState } from 'react'
import { displayName, fetchResource } from '../api.js'
import { Message, ResourcePage } from './Activities.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState(null); const [error, setError] = useState('')
  useEffect(() => { fetchResource('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="MONTHLY RACE" title="Leaderboard" count={entries?.length}><div className="table-scroll"><table className="data-table"><thead><tr><th>Rank</th><th>Athlete</th><th>Points</th></tr></thead><tbody>{entries?.map((entry, index) => <tr key={entry._id}><td><span className="rank">{entry.rank || index + 1}</span></td><td className="primary-text">{displayName(entry.user)}</td><td><span className="points">{entry.points || 0} pts</span></td></tr>)}</tbody></table></div><Message loading={!entries && !error} error={error} empty={entries?.length === 0} /></ResourcePage>
}
export default Leaderboard