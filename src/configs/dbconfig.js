import { connect } from 'mongoose';
import Logger from '/Users/andreabreu/Documents/todoJs/src/configs/logger.js';

export const connectDb = async () => {
    const connectionDb = await connect(process.env.MONGO_URI);
    Logger.info(`Connect to MongoDB! Database name: ${connectionDb.connections[0].name}`)
};