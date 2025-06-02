import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [fullUrl, setFullUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  const handleLogout = async () => {
    try {
      // Call backend logout route to clear the cookie
      const response = await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // This is required to include the cookie in the request
      });

      if (response.ok) {
        // Clear client-side state only if server-side logout succeeded
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Logout failed on server');
      }
    } catch (err) {
      console.error('Network error during logout', err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${backendUrl}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // important to send cookies
        body: JSON.stringify({ fullUrl })
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Network error, please try again');
    }
  };

  return (
    <>
      <div className="maindiv">
        <div className="top-bar">
          <div className="spacer"></div>

          <div className="nav-wrapper">
            <div className="nav-container">
              <Link to="/myurls" className="auth-item">My Urls</Link>

              <Link to="/about" className="nav-item">About</Link>

            </div>
          </div>

          <div className="auth-container">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="auth-item">Login</Link>
                <Link to="/signup" className="auth-item">Signup</Link>
              </>
            ) : (
              <button className="auth-item" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="formdata">
          <h2>Paste the URL to be shortened</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter URL here"
                value={fullUrl}
                onChange={(e) => setFullUrl(e.target.value)}
              />
              <button type="submit">Shorten</button>
            </div>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {shortUrl && (
            <p>
              Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </p>
          )}

          <p className="form-description">
            Create compact, easy-to-share links for cleaner URLs.<br />
            Perfect for social media, emails, or anywhere you need brevity.
          </p>
        </div>
      </div>
      <section className="home-info-section">
        <h2>Welcome to TILinkny - Your Smart URL Shortener</h2>
        <p>
          TILinkny helps you shorten long, clunky links from platforms like Instagram, Facebook, YouTube, LinkedIn, WhatsApp, TikTok, and more.
          Just paste your link above and click <strong>Shorten</strong>. A clean, shareable URL is ready instantly!
        </p>

        <p>
          Share your links across social media, blogs, or messages and track their performance with ease. It's built for creators, marketers, and everyday users alike.
        </p>

        <p>
          <strong>New features</strong> like QR code generation, custom aliases, and detailed click analytics are being added regularly.
        </p>

        <p>
          Navigate to the <strong>About</strong> page to learn more about how to use the platform and explore what's coming next.
        </p>
      </section>


    </>
  );
}

export default App;
