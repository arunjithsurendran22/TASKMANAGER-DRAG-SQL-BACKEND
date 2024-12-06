import http from 'http';
import app from './app';
import routes from './routes/routes';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client
import config from './config/config';
import errorMiddleware from './middlewares/web_server/error-middleware';
import serverConfig from './server';

const prisma = new PrismaClient(); // Initialize Prisma Client

// Routes for each endpoint
routes(app);

// Prisma does not require manual connection handling like MongoDB, 
// but you can test the connection like this:
(async () => {
  try {
    await prisma.$connect();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
})();

// Use the error handling middleware
app.use(errorMiddleware);

// Create the server and initialize Socket.io
const server = http.createServer(app);

// Start server
serverConfig(app, config).startServer();
