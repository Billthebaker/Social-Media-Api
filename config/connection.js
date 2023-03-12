const { connect, connection } = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network';

// Connect to MongoDB
connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Listen for MongoDB connection events
connection.on('connected', () => {
  console.log('MongoDB connected');
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Listen for Node process termination events and close the MongoDB connection
process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});