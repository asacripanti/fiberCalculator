import pg from 'pg';

const db = new pg.Client("postgresql:///fibercalculator");

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to the database:", err));

// Function to create the meal table if it doesn't exist
const createMealTable = () => {
  db.query(`
    CREATE TABLE IF NOT EXISTS meal (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      fiber_amount FLOAT
    )
  `)
  .then(() => console.log("Meal table created or already exists"))
  .catch(err => console.error("Error creating meal table:", err));
};

// Call the function to create the meal table
createMealTable();

export default db;
