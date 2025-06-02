import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('email', email);
      navigate('/');
    } else {
      alert(data.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Signup</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
          <p style={{ textAlign: 'center', marginTop: '16px', color: 'black' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
              Login
            </a>
          </p>

        </form>
      </div>
      <div className="bg-container"></div>
    </div>
  );
};

export default Signup;
