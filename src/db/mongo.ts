import mongoose from 'mongoose';
import { env } from '../config/env.ts';

const candidate = process.env.MONGO_URI || process.env.MONGO_URL || env.DATABASE_URL;
const isMongoScheme = (u?: string) => !!u && (u.startsWith('mongodb://') || u.startsWith('mongodb+srv://'));
const MONGO_URI = isMongoScheme(candidate) ? candidate : process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/yourbox';

export const connectMongo = async () => {
  try {
  // log only scheme+host (mask credentials)
  const safe = MONGO_URI.replace(/:\/\/.*@/, '://*****@');
  await mongoose.connect(MONGO_URI);
  console.info('MongoDB connected to', safe);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default mongoose;