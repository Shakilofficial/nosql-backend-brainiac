import { Server } from 'http';
import app from './app';
import config from './app/config';
import { connectDB } from './app/config/db';

let server: Server;

const start = async (): Promise<void> => {
  try {
    await connectDB();
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
  } catch (error) {
    console.error('🚨 Failed to start the server ❌', error);
    process.exit(1);
  }
};

const shutdown = (reason: string): void => {
  console.log(`🚨 ${reason}, shutting down the server 🏃🏽‍♂️`);
  if (server) {
    server.close(() => {
      console.log('👋 Server is closed 🏃🏽‍♂️');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (reason) => {
  console.error('🚨 Unhandled Rejection detected ❌:', reason);
  shutdown('Unhandled Rejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception detected ❌:', error);
  shutdown('Uncaught Exception');
});

start();
