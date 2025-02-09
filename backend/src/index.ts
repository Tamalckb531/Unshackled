import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import newsRoute from './routes/news.route'
import commentRoute from './routes/comment.route'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = 3000;
const prisma = new PrismaClient();

//? server for handling both express and websocket
const server = http.createServer(app);

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

//! --------- Web Socket server ---------
const wss = new WebSocketServer({ server });

interface JwtPayload{
  id: string;
}

const clients = new Map<string, { ws: WebSocket, userId: string }>();

wss.on('connection', async (ws, req) => {
  const token = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('token');
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!token || !secretKey) {
    ws.close();
    return;
  }

  jwt.verify(token, secretKey, async (error, decode) => {
    if (error) {
      ws.close();
      return;
    }

    const { id: userId } = decode as JwtPayload;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          photoURL: true
        }
      });

      if (!user) {
        console.log("No user found");
        ws.close();
        return;
      }

      clients.set(userId, { ws, userId });
      console.log(`User ${user.firstName} connected to WebSocket`);

      ws.on('message', async (msg) => {
        try {
          const data = JSON.parse(msg.toString());
  
          if (data.type === "send_invitation") {
            for (const collabId of data.collaborators) {
              const collabWs = clients.get(collabId);
              if (collabWs) {
                collabWs.ws.send(JSON.stringify({
                  type: "invitation",
                  hostId: user.id,
                  from: user.userName,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  photoURL: user.photoURL,
                  room: data.room
                }));
              }
            }
          } else if (data.type === "invitation_response") {
            const hostWs = clients.get(data.host);
            if (hostWs) {
              hostWs.ws.send(JSON.stringify({
                  type: "collaborator_response",
                  status: data.status,
                  collaboratorId: user.id,
                  from: user.userName,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  photoURL: user.photoURL,
              }))
            }
          } else if (data.type === "host_disconnect") {
            for (const collabId of data.collaborators) {
              const collabWs = clients.get(collabId);
              if (collabWs) {
                collabWs.ws.send(JSON.stringify({
                  type: "host_disconnect_msg",
                }));
              }
            }
          } else if (data.type === "news_submitted") {
            for (const collabId of data.collaborators) {
              const collabWs = clients.get(collabId);
              if (collabWs) {
                collabWs.ws.send(JSON.stringify({
                  type: "host_submitted_news",
                  newsId:data.newsId
                }));
              }
            }
          }
          
        } catch (error) {
          console.error("Error in message handling:", error);
          clients.delete(userId);
          ws.close();
        }
      });

      ws.on('close', () => {
        clients.delete(userId);
        console.log(`User ${user.firstName} disconnected`);
      })
      
    } catch (error) {
      console.error("Failed in database operation", error);
      ws.close();
    }
  })

})

//! --------- Web Socket server ---------

// Start the server
server.listen(port, () => {
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