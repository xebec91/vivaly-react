import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      await login(form);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-card auth-card-login">
      <div role="region" aria-labelledby="titre-connexion">
        <form onSubmit={handleSubmit}>
          <h2 id="titre-connexion" className="auth-title">Connexion</h2>

          <div className="auth-field auth-field-spaced">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Votre email"
            />
          </div>

          <div className="auth-field auth-field-spaced">
            <label htmlFor="password">Mot de passe</label>
            <div className="auth-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Afficher ou masquer le mot de passe"
              >
                <svg className="password-eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-button">
            Se connecter
          </button>

          <p className="auth-bottom-text">
            Pas de compte ?{' '}
            <Link to="/register" className="auth-inline-link">
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;