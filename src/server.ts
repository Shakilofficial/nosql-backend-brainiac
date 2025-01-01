import { Server } from 'http';
import app from './app';
import config from './app/config';
import { connectDB } from './app/config/db';
import seedSuperAdmin from './app/config/seedSuperAdmin';

let server: Server;

const shutdown = (): void => {
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
  shutdown();
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception detected ❌:', error);
  shutdown();
});

const start = async (): Promise<void> => {
  try {
    await connectDB();
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
    await seedSuperAdmin();
  } catch (error) {
    console.error('🚨 Failed to start the server ❌', error);
    process.exit(1);
  }
};

start();
