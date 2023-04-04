import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routesApp from './router/index';


dotenv.config()


const app = express()

app.use(cors());
app.use(express.json())
app.use(helmet())
app.use( morgan('dev'))

app.use('/api', routesApp)


export default app;