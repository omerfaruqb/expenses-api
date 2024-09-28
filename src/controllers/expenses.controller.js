const expenseService = require("../services/expense.service");

const create = async (req, res) => {
  const { user_id, category_id, description, amount, purchased_at } = req.body;

  try {
    const result = await expenseService.create(
      user_id,
      category_id,
      description,
      amount,
      purchased_at
    );
    const { statusCode, success, message } = result;

    if (success) {
      return res.status(statusCode).json({ message });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  const { expense_id } = req.params;

  try {
    const result = await expenseService.deleteById(expense_id);
    const { statusCode, success, message } = result;

    if (success) {
      return res.status(statusCode).json({ message });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateById = async (req, res) => {
  const { expense_id } = req.params;
  const { description, amount, purchased_at } = req.body;

  try {
    const result = await expenseService.updateById(
      expense_id,
      description,
      amount,
      purchased_at
    );
    const { statusCode, success, message } = result;

    if (success) {
      return res.status(statusCode).json({ message });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await expenseService.getByUser(user_id);
    const { statusCode, success, message, data } = result;

    if (success) {
      return res.status(statusCode).json({ message, data });
    } else {
      return res.status(statusCode).json({ message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  deleteById,
  updateById,
};
