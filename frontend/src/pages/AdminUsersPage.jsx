import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteAdminUser, getAdminUsers } from '../services/adminService';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Impossible de charger les utilisateurs.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm('Supprimer cet utilisateur ?');
    if (!confirmed) return;

    try {
      await deleteAdminUser(id);
      await loadUsers();
    } catch (err) {
      alert(err.message || 'Suppression impossible.');
    }
  }

  if (loading) {
    return (
      <section className="admin-users-page">
        <p>Chargement...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-users-page">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="admin-users-page">
      <h1 className="admin-users-title">Gestion des utilisateurs</h1>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Rôle</th>
              <th className="admin-users-actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={user.role === 'admin' ? 'admin-row admin-row-highlight' : 'admin-row'}
              >
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={
                      user.role === 'admin'
                        ? 'admin-role-badge admin-role-admin'
                        : 'admin-role-badge admin-role-user'
                    }
                  >
                    {user.role}
                  </span>
                </td>
                <td className="admin-users-actions">
                  <Link to={`/admin/users/edit/${user.id}`} className="admin-link-edit">
                    Modifier
                  </Link>
                  <button
                    type="button"
                    className="admin-link-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminUsersPage;