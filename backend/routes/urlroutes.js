// backend/routes/urlRoutes.js
import express from 'express';
import ShortUrl from '../models/shorturl.js';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { fullUrl } = req.body;
  const shortId = Math.random().toString(36).substring(2, 8);

  try {
    const newUrl = await ShortUrl.create({ fullUrl, shortId });
    res.json({ shortUrl: `https://yourdomain.com/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await ShortUrl.findOne({ shortId });

  if (url) {
    return res.redirect(url.fullUrl);
  } else {
    return res.status(404).send("URL not found");
  }
});

export default router;
