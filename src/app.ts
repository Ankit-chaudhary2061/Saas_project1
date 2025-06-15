import express from 'express';
const app = express();
import authRoutes from './routes/global/auth/authRoutes'
app.use(express.json());


app.use("/api", authRoutes);




export default app;
