import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('email', email);
      navigate('/');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p style={{ textAlign: 'center', marginTop: '16px', color: 'black' }}>
            Don&apos;t have an account?{' '}
            <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
              Signup
            </a>
          </p>

        </form>
      </div>
      <div className='bg-container'>

      </div>
    </div>
  );
};

export default Login;
