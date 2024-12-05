import express, { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import { connectDb } from '/Users/andreabreu/Documents/todoJs/src/configs/dbconfig.js';
import morgan from 'morgan';
import cors from 'cors';
import routes from '/Users/andreabreu/Documents/todoJs/src/routes/index.js';
import logger from '/Users/andreabreu/Documents/todoJs/src/configs/logger.js';


dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use("/", routes);

app.use(morgan('dev'),
    urlencoded({ extended: true }),
    (json()),
    cors()
);

app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`));