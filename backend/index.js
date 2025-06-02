import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import cors from 'cors';
import Url from './models/Url.js';
import authRoutes from './routes/auth.js';
import { verifyToken } from './middleware/verifyToken.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';


dotenv.config();
console.log('JWT_SECRET in index.js:', process.env.JWT_SECRET);
const frontendurl = process.env.VITE_FRONTEND_URL;

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: `${frontendurl}`,
  credentials: true,
}));


app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.post('/shorten', async (req, res) => {
  let { fullUrl } = req.body;
  const backendurl = process.env.NODE_BACKEND_URL;

  if (!fullUrl) {
    return res.status(400).json({ error: "Full URL is required" });
  }

  if (!/^https?:\/\//i.test(fullUrl)) {
    fullUrl = 'https://' + fullUrl;
  }

  let userId = null;

  try {
    // Optional token check
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded._id;
      } catch (err) {
        console.warn('Invalid token, continuing as anonymous user');
      }
    }

    const shortId = nanoid(6);

    const newUrl = new Url({
      originalUrl: fullUrl,
      shortId,
      userId, // Will be null if anonymous
    });

    await newUrl.save();

    const shortUrl = `${backendurl}/${shortId}`;
    res.json({ shortUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating short URL' });
  }
});


app.get('/user/urls', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const urls = await Url.find({ userId });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await Url.findOne({ shortId });
    if (entry) {
      return res.redirect(entry.originalUrl);
    } else {
      return res.status(404).send('Short URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/debug/urls', async (req, res) => {
  const urls = await Url.find();
  res.json(urls);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
