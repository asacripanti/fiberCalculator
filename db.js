import pg from 'pg';

const db = new pg.Client("postgresql:///fibercalculator");

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to the database:", err));

export default db;
