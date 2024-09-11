import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js'
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import notificationRouter from './routes/notification.route.js'
import connectionRouter from './routes/connection.route.js'
import path from 'path';

const app = express();
dotenv.config()

const __dirname = path.resolve()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.json({limit: '5mb'}));
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/notifications', notificationRouter)
app.use('/api/v1/connections', connectionRouter)
connect();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})