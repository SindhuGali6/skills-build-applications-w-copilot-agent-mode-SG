import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { Message, ResourcePage } from './Activities.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState(null); const [error, setError] = useState('')
  useEffect(() => { fetchResource(teamsEndpoint).then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="THE CREW" title="Teams" count={teams?.length}><div className="cards-grid">{teams?.map((team) => <article className="data-card" key={team._id}><span className="card-meta">{team.members?.length || 0} MEMBERS</span><h3>{team.name}</h3><p>{team.description || 'A team ready to move together.'}</p></article>)}</div><Message loading={!teams && !error} error={error} empty={teams?.length === 0} /></ResourcePage>
}
export default Teams