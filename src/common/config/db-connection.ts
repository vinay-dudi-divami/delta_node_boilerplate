import { DataSource } from 'typeorm';
// import { entities } from '../entities';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
export let db_connection: DataSource;
// Create a new DataSource instance for PostgreSQL database connection

// Initialize the relational database connection
export const initiateDBConnection = async (): Promise<void> => {
  db_connection = new DataSource({
    type: process.env.TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    // entities: [...entities],
    // autoLoadEntities: true
  });

  // Initialize the database connection
  db_connection
    .initialize()
    .then(() => {
      console.log('Database connected :  ', db_connection.options.database);
      console.log('Data Source has been initialized!', process.env.DB_NAME);
    })
    .catch((err) => {
      Logger.error('Error during Data Source initialization', err);
    });
};

// Initialize the MongoDB Database connection
export const initiateMongoDBConnection = async (): Promise<typeof mongoose> => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection successful');
    return db;
  } catch (error) {
    Logger.error('Error while connecting MondoDB', error);
  }
};
