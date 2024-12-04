const pool = require('../config/db');

const DevelopersModel = {
    createDeveloper: async (developer) => {
        const query = `
            INSERT INTO Developers (email, name, apiKey, password)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [developer.email, developer.name, developer.apiKey, developer.password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    getDeveloperByEmail: async (email) => {
        const query = `SELECT * FROM Developers WHERE email = $1;`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },
    fetchApplicationsByDeveloper: async (email) => {
        const query = `
            SELECT appId, name, description, createdAt
            FROM Applications
            WHERE developerEmail = $1;
        `;
        const result = await pool.query(query, [email]);
        return result.rows;
    },
    doesDeveloperExist: async (email) => {
        const query = `SELECT 1 FROM Developers WHERE email = $1 LIMIT 1;`;
        const result = await pool.query(query, [email]);
        return result.rowCount > 0; // Returns true if the developer exists
    }
};

module.exports = DevelopersModel;
