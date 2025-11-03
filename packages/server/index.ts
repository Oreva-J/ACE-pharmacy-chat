import express from 'express';
import router from './routes/chatRoute.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json())
app.use(router)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

// For Vercel serverless
export default app;