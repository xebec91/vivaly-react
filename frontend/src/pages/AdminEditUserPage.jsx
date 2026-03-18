import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAdminUserById, updateAdminUser } from '../services/adminService';

function AdminEditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const user = await getAdminUserById(id);
        setForm({
          email: user.email,
          password: '',
          role: user.role,
        });
      } catch (err) {
        setError(err.message || 'Utilisateur introuvable.');
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await updateAdminUser(id, form);
      navigate('/admin/users');
    } catch (err) {
      setError(err.message || 'Mise à jour impossible.');
    }
  }

  if (loading) {
    return (
      <section className="admin-edit-page">
        <p>Chargement...</p>
      </section>
    );
  }

  if (error && !form.email) {
    return (
      <section className="admin-edit-page">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="admin-edit-page">
      <h1 className="admin-edit-title">Modifier un utilisateur</h1>

      <form onSubmit={handleSubmit} className="admin-edit-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Laisser vide pour ne pas modifier"
          />
          <span className="admin-edit-help">
            Laisser vide pour conserver l'ancien mot de passe.
          </span>
        </div>

        <div>
          <label htmlFor="role">Rôle</label>
          <select
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {error && <p className="admin-edit-error">{error}</p>}

        <button type="submit" className="admin-edit-submit">
          <svg className="admin-edit-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Mettre à jour
        </button>

        <div className="admin-edit-back">
          <Link to="/admin/users">← Retour à la liste des utilisateurs</Link>
        </div>
      </form>
    </section>
  );
}

export default AdminEditUserPage;