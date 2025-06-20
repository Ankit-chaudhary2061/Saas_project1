import express from 'express';
const app = express();
import authRoutes from './routes/global/auth/authRoutes';
import instituteRoute from './routes/institute/instituteRoute';
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/institute', instituteRoute);

export default app;
