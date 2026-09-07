import { useEffect, useState } from 'react'
import { displayName, fetchResource } from '../api.js'
import { Message, ResourcePage } from './Activities.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState(null); const [error, setError] = useState('')
  useEffect(() => { fetchResource(usersEndpoint).then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <ResourcePage eyebrow="ATHLETE DIRECTORY" title="Users" count={users?.length}><div className="table-scroll"><table className="data-table"><thead><tr><th>Name</th><th>Username</th><th>Grade</th><th>Email</th></tr></thead><tbody>{users?.map((user) => <tr key={user._id}><td className="primary-text">{displayName(user)}</td><td className="secondary-text">@{user.username}</td><td><span className="tag">{user.profile?.grade || '—'}</span></td><td className="secondary-text">{user.email}</td></tr>)}</tbody></table></div><Message loading={!users && !error} error={error} empty={users?.length === 0} /></ResourcePage>
}
export default Users