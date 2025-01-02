import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import newsRoute from './routes/news.route'
import commentRoute from './routes/comment.route'
import verifyToken from './utils/verifyToken';

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(cors({
  origin: 'http://localhost:3001',  
  credentials: true  // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());


//? routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/news', newsRoute);
app.use('/api/comments', commentRoute);

// test
app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    endPoint: "test",
    status:"healthy"
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

//? Global catch -> run at the last and catch all the thrown res
app.use((err:any, req:Request, res:Response, next: NextFunction) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal server error";

  res.status(statuscode).json({
      success: false,
      statuscode,
      message
  })
})