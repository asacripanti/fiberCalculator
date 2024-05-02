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

router.get('/meal/avgFiber', async (req, res) => {
  try {
    // Query your database to fetch meals with fiber amount greater than or equal to 6 grams
    const query = 'SELECT * FROM meal WHERE fiber_amount >= 6.0';
    const result = await db.query(query);

    console.log('Fetched meals based on average fiber:', result.rows);
    // Send the fetched meals as a JSON response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching meals based on average fiber:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
