import express from 'express';
import db from './db.js'; // Import database connection using ES module syntax

const router = express.Router();

// Route for fetching all meals
router.get('/meal', async (req, res) => {
  try {
// Query your database to fetch all meals
const result = await db.query('SELECT * FROM meal'); // Update table name to "meal"
console.log('Fetched meal:', result.rows);
// Send the fetched meals as a JSON response
res.json(result.rows);
} catch (error) {
console.error('Error fetching meal:', error);
res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
