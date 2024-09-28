const expenseModel = require("../models/expense.model");

const create = async (user_id, category_id, description, amount, purchased_at) => {
  try {
    const result = await expenseModel.create(user_id, category_id, description, amount, purchased_at);
    const { statusCode, success, message } = result;

    return {
      statusCode,
      success,
      message,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message
    };
  }
};

const deleteById = async (id) => {
  try {
    const result = await expenseModel.deleteById(id);
    const { statusCode, success, message } = result;

    return {
      statusCode,
      success,
      message,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message
    };
  }
};

const updateById = async (
  id,
  description,
  amount,
  purchased_at
) => {
  try {
    const result = await expenseModel.updateById(id, description, amount, purchased_at);
    const { statusCode, success, message } = result;

    return {
      statusCode,
      success,
      message,
    };

  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message
    };
  }
};

const getById = async (id) => {
  try {
    const result = await expenseModel.getById(id);
    const { statusCode, success, message, data } = result;

    return {
      statusCode,
      success,
      message,
      data,
    };

  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message
    };
  }
};

const getByUser = async (user_id) => {
  try {
    const result = await expenseModel.getByUser(user_id);
    const { statusCode, success, message, data } = result;

    return {
      statusCode,
      success,
      message,
      data,
    };

  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message
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
