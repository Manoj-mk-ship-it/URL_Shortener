import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import MyUrls from './MyUrls';
import About from './About.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myurls" element={<MyUrls />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
