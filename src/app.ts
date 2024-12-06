import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads


export default app;
