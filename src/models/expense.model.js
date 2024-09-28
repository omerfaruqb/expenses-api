const { Pool } = require("pg");

const pool = new Pool({
  user: "expenses-admin",
  host: "localhost",
  database: "expenses",
  password: "1",
  port: 5432,
});

const create = async (
  user_id,
  category_id,
  description,
  amount,
  purchased_at
) => {
  const query =
    "INSERT INTO expenses (user_id, category_id, description, amount, purchased_at) VALUES ($1, $2, $3, $4, $5)";
  const values = [user_id, category_id, description, amount, purchased_at];

  try {
    const result = await pool.query(query, values);
    return {
      success: true,
      message: "Expense created",
    };
  } catch (error) {
    switch (error.code) {
      case "23502":
        return {
          success: false,
          message: "User ID, category ID, description, amount are required!",
        };
      default:
        return {
          success: false,
          message: error.message,
        };
    }
  }
};

const deleteById = async (id) => {
  const query = "DELETE FROM expenses WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return {
      success: true,
      message: "Expense deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const updateById = async (
  id,
  user_id,
  category_id,
  description,
  amount,
  purchased_at
) => {
  const query =
    "UPDATE expenses SET user_id = $2, category_id = $3, description = $4, amount = $5, purchased_at = $6 WHERE id = $1";
  const values = [id, user_id, category_id, description, amount, purchased_at];

  try {
    const result = await pool.query(query, values);
    return {
      success: true,
      message: "Expense updated",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getById = async (id) => {
  const query = "SELECT * FROM expenses WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return {
      success: true,
      data: result.rows[0],
      message: "Expense found",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getByUser = async (user_id) => {
  const query = "SELECT * FROM expenses WHERE user_id = $1";
  const values = [user_id];

  try {
    const result = await pool.query(query, values);
    return {
      success: true,
      data: result.rows,
      message: "Expenses found",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  create,
  deleteById,
  updateById,
  getById,
  getByUser,
};
