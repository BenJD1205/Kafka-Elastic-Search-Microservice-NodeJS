import dotenv from 'dotenv'
dotenv.config()

export const DB_URL = process.env.DATABASE_URL
export const APP_PORT = process.env.APP_PORT
export const CLIENT_ID = process.env.CLIENT_ID || 'catalog-service';
export const GROUP_ID = process.env.GROUP_ID || 'catalog-service-group';
export const BROKERS = [process.env.BROKER_1 || "localhost:9092"];
