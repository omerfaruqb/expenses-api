const { Pool } = require("pg");

const pool = new Pool({
  user: "expenses-admin",
  host: "localhost",
  database: "expenses",
  password: "1",
  port: 5432,
});

const create = async (name, email, password) => {
  const query =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id";
  const values = [name, email, password];

  try {
    const result = await pool.query(query, values);
    return {
      statusCode: 201, // 201 Created
      success: true,
      data: result.rows[0],
      message: "User created",
    };
  } catch (error) {
    switch (error.code) {
      case "23502":
        return {
          statusCode: 400, // 400 Bad Request
          success: false,
          message: "Name, email, and password are required!",
        };
      case "23505":
        return {
          statusCode: 409, // 409 Conflict
          success: false,
          message: "Email already exists!",
        };
      default:
        return {
          statusCode: 500, // 500 Internal Server Error
          success: false,
          message: error.message,
        };
    }
  }
};

const getByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return {
        statusCode: 404, // 404 Not Found
        success: false,
        message: "User not found",
      };
    } else {
      return {
        statusCode: 200, // 200 OK
        success: true,
        data: result.rows[0],
        message: "User found",
      };
    }
  } catch (error) {
    return {
      statusCode: 500, // 500 Internal Server Error
      success: false,
      message: error.message,
    };
  }
};

const getById = async (id) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return {
        statusCode: 404, // 404 Not Found
        success: false,
        message: "User not found",
      };
    } else {
      return {
        statusCode: 200, // 200 OK
        success: true,
        data: result.rows[0],
        message: "User found",
      };
    }
  } catch (error) {
    return {
      statusCode: 500, // 500 Internal Server Error
      success: false,
      message: error.message,
    };
  }
};

const deleteById = async (id) => {
  const query = "DELETE FROM users WHERE id = ? RETURNING *";
  const values = [id];

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return {
        statusCode: 404, // 404 Not Found
        success: false,
        message: "User not found",
      };
    } else {
      return {
        statusCode: 200, // 200 OK
        success: true,
        message: "User deleted",
      };
    }
  } catch (error) {
    return {
      statusCode: 500, // 500 Internal Server Error
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  create,
  getByEmail,
  getById,
  deleteById,
};
