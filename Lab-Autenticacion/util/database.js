require("dotenv").config();
const { Pool } = require("pg");

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5,
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error:', err.stack);
  } else {
    console.log('Database connected');
  }
});

module.exports = pool;