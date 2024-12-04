const pool = require('../config/db');

const UserModel = {
    createUser: async ({ userId, appId, firstSeen, lastSeen }) => {
        const query = `
            INSERT INTO Users (userId, appId, firstSeen, lastSeen)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [userId, appId, firstSeen, lastSeen];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getUserByIdAndAppId: async (userId, appId) => {
        const query = `
            SELECT * FROM Users WHERE userId = $1 AND appId = $2;
        `;
        const result = await pool.query(query, [userId, appId]);
        return result.rows[0];
    },

    updateUser: async (userId, appId, updates) => {
        const query = `
            UPDATE Users
            SET lastSeen = COALESCE($3, lastSeen)
            WHERE userId = $1 AND appId = $2
            RETURNING *;
        `;
        const values = [userId, appId, updates.lastSeen];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    deleteUser: async (userId, appId) => {
        const query = `
            DELETE FROM Users WHERE userId = $1 AND appId = $2 RETURNING *;
        `;
        const result = await pool.query(query, [userId, appId]);
        return result.rows[0];
    },

    getUsersByAppId: async (appId) => {
        const query = `
            SELECT * FROM Users WHERE appId = $1;
        `;
        const result = await pool.query(query, [appId]);
        return result.rows;
    },

    doesApplicationExist: async (appId) => {
        const query = `
            SELECT 1 FROM Applications WHERE appId = $1 LIMIT 1;
        `;
        const result = await pool.query(query, [appId]);
        return result.rowCount > 0;
    },
};

module.exports = UserModel;
