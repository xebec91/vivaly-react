import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm: '',
    phone_number: '',
    address_line1: '',
    address_line2: '',
    postal_code: '',
    city: '',
    country: '',
    cgv: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      await register(form);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-card auth-card-register">
      <h1 className="auth-title auth-title-register">Créer un compte</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-grid-two">
          <div className="auth-field">
            <label htmlFor="first_name">Prénom</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Law"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="last_name">Nom</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Meteillor"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="auth-field auth-field-full">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="nom@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Mot de passe</label>
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
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

        <div className="auth-field">
          <label htmlFor="confirm">Confirmer le mot de passe</label>
          <div className="auth-password-wrapper">
            <input
              type={showConfirm ? 'text' : 'password'}
              id="confirm"
              name="confirm"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowConfirm((prev) => !prev)}
              aria-label="Afficher ou masquer le mot de passe"
            >
              <svg className="password-eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="auth-field auth-field-full">
          <label htmlFor="phone_number">Numéro de téléphone</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            placeholder="+33123456789"
            value={form.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field auth-field-full">
          <label htmlFor="address_line1">Adresse</label>
          <input
            type="text"
            id="address_line1"
            name="address_line1"
            placeholder="15 Avenue de la République"
            value={form.address_line1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field auth-field-full">
          <label htmlFor="address_line2">Adresse complémentaire</label>
          <input
            type="text"
            id="address_line2"
            name="address_line2"
            placeholder="Étage 51, Appartement 85"
            value={form.address_line2}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="postal_code">Code Postal</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            placeholder="75015"
            value={form.postal_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Paris"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field auth-field-full">
          <label htmlFor="country">Pays de résidence</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="France"
            value={form.country}
            onChange={handleChange}
            required
          />
        </div>

        <label className="register-checkbox-row">
          <input
            type="checkbox"
            name="cgv"
            checked={form.cgv}
            onChange={handleChange}
            required
          />
          <span>
            J'accepte les <Link to="/cgv" className="auth-inline-link">CGV</Link> et la{' '}
            <Link to="/confidentialite" className="auth-inline-link">politique de confidentialité</Link>
          </span>
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit-button auth-submit-button-register">
          Créer mon compte
        </button>

        <p className="auth-bottom-text">
          Déjà un compte ?{' '}
          <Link to="/login" className="auth-inline-link">
            Se connecter
          </Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;