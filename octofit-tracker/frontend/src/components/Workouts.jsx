import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { Message, ResourcePage } from './Activities.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState(null); const [error, setError] = useState('')
  useEffect(() => { fetchResource(workoutsEndpoint).then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="TRAINING LIBRARY" title="Workouts" count={workouts?.length}><div className="cards-grid">{workouts?.map((workout) => <article className="data-card" key={workout._id}><span className="card-meta">{workout.focus} / {workout.durationMinutes} MIN</span><h3>{workout.title}</h3><p>{workout.description}</p><span className="tag">{workout.difficulty}</span></article>)}</div><Message loading={!workouts && !error} error={error} empty={workouts?.length === 0} /></ResourcePage>
}
export default Workouts