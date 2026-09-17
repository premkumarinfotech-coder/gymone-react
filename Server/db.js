const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const schemaPath = path.join(__dirname, 'schema.sql');
if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is required to connect to PostgreSQL.');
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const ready = pool.query(fs.readFileSync(schemaPath, 'utf8'))
	.then(() => console.log('PostgreSQL database ready.'))
	.catch((error) => {
		console.error('PostgreSQL schema initialization failed:', error.message);
		throw error;
	});

async function query(text, values) {
	await ready;
	return pool.query(text, values);
}

module.exports = { query, pool };