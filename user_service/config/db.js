require("dotenv").config();
const { Pool } = require("pg");
const { connectionString } = require("pg/lib/defaults");

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
	console.log("connected to the database");
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
