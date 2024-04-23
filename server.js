import express from 'express';
import routes from './routes.js'; // Note the use of '.js' extension

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use('/api', routes); // Use routes defined in backend/routes.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
