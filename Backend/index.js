import express from 'express';
 // Named import
import { connectDB } from './src/Database/mongoDB.js';
import bodyParser from 'body-parser';
import router from './src/Feature/IMDB/imdb.routes.js';

const app = express();
const Port = 4000;

app.use(bodyParser.json());
app.use("/api/imdb", router);

// Define a route
app.get('/', (req, res) => {
    res.json("Welcome to Backend");
});

// Start the server
app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
    connectDB();  // Call connectDB when the server starts
});
