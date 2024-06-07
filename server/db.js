// PostgreSQL database configuration
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    password: "m@lo2Ba3",
    host: "localhost",
    port: 5432, // PostgreSQL default port
    database: "perntodo",
  });
 


module.exports = pool;


