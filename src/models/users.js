const pool = require("../config/db"); // Import the database connection

const UserModel = {
  createUser: async ({
    email,
    firstName,
    lastName,
    password,
    birthdate,
    interests,
  }) => {
    const query = `
      INSERT INTO users (email, first_name, last_name, password, birthdate, interests)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [email, firstName, lastName, password, birthdate, interests];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getUserByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },
  getUserByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  getUserByEmailAndPassword: async (email, password) => {
    const query = `
      SELECT * FROM users
      WHERE email = $1 AND password = $2;
    `;
    const result = await pool.query(query, [email, password]);
    return result.rows[0];
  },
  getUserByEmailAndPassword: async (email, password) => {
    const query = `
      SELECT * FROM users
      WHERE email = $1 AND password = $2;
    `;
    const result = await pool.query(query, [email, password]);
    return result.rows[0];
  },

  getPaginatedUsers: async (offset, limit) => {
    const query = `
        SELECT email, first_name, last_name, birthdate, interests
        FROM users
        ORDER BY email ASC
        LIMIT $1 OFFSET $2;
      `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  },

  getUsersByLastname: async (lastname, limit, offset) => {
    const query = `
      SELECT email, first_name, last_name, birthdate, interests
      FROM users
      WHERE last_name = $1
      ORDER BY email ASC
      LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [lastname, limit, offset]);
    return result.rows;
  },

  getUsersByMinimumAge: async (minimumAge, limit, offset) => {
    const query = `
      SELECT email, first_name, last_name, birthdate, interests
      FROM users
      WHERE EXTRACT(YEAR FROM AGE(birthdate)) >= $1
      ORDER BY email ASC
      LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [minimumAge, limit, offset]);
    return result.rows;
  },

  getUsersByEmailDomain: async (domain, limit, offset) => {
    const query = `
      SELECT email, first_name, last_name, birthdate, interests
      FROM users
      WHERE email LIKE $1
      ORDER BY email ASC
      LIMIT $2 OFFSET $3;
    `;
    const values = [`%@${domain}`, limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
  },

  deleteAll: async () => {
    const query = `
        TRUNCATE TABLE users CASCADE;
      `;
    await pool.query(query);
  },
};

module.exports = UserModel;
