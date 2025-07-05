import dotenv from 'dotenv';
import express, { Express } from 'express';
import connectDB from './config/database';
import authRouter from './routes/auth';
import jobsRouter from './routes/jobs';
import authenticateUser from './middleware/authenticate-user';
import notFoundHandler from './middleware/not-found';
import errorHandler from './middleware/error-handler';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from './middleware/rate-limiter';
import setupSwagger from './config/swagger';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Express = express();

// Enable trust proxy for cloud deployments
app.set('trust proxy', 1);

// security middleware
app.use(rateLimiter);
app.use(helmet());
app.use(cors());

// setup Swagger
setupSwagger(app);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', authenticateUser, jobsRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// starting the server
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed', err);
  }
};

start();
