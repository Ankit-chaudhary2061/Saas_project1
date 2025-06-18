import express from 'express';
const app = express();
import authRoutes from './routes/global/auth/authRoutes';
import instituteRoute from './controller/institute/instituteRoute';
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', instituteRoute);

export default app;
