import './MyUrls.css';
import { useEffect, useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${backendUrl}/user/urls`, {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 401) {
            setError("You're not logged in. Please log in or sign up to view your shortened URLs.");
          } else {
            setError(errorData.error || 'Failed to load URLs');
          }
        } else {
          const data = await res.json();
          setUrls(data);
        }
      })
      .catch(() => setError('Network error'));
  }, []);

  return (
    <div className="myurls-page">
      <h2>My Shortened URLs</h2>
      {error && <p className="error-msg">{error}</p>}
      {urls.length > 0 && (
        <table className="urls-table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Shortened URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td>
                  <a href={url.originalUrl} target="_blank" rel="noreferrer">
                    {url.originalUrl}
                  </a>
                </td>
                <td>
                  <a href={`${backendUrl}/${url.shortId}`} target="_blank" rel="noreferrer">
                    {`${backendUrl}/${url.shortId}`}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyUrls;
