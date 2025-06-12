import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

 
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL ,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public '));
app.use(cookieParser());

//routes
import userRoutes from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the basic Node route!');
  });


 export {app}