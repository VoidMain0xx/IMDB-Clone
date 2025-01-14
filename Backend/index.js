import express from 'express';
// Named import
import { connectDB } from './src/Database/mongoDB.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors
import router from './src/Feature/IMDB/imdb.routes.js';

const app = express();
const Port = 4000;

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use your router
app.use("/api/imdb", router);

// Define a test route
app.get('/', (req, res) => {
  res.json("Welcome to Backend");
});

// Start the server
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
  connectDB(); // Call connectDB when the server starts
});
