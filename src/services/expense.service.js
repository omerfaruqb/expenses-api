const expenseModel = require("../models/expense.model");

const create = async (
  user_id,
  category_id,
  description,
  amount,
  purchased_at
) => {
  return expenseModel.create(
    user_id,
    category_id,
    description,
    amount,
    purchased_at
  );
};

const deleteById = async (id) => {
  return expenseModel.deleteById(id);
};

const updateById = async (
  id,
  user_id,
  category_id,
  description,
  amount,
  purchased_at
) => {
  return expenseModel.updateById(
    id,
    user_id,
    category_id,
    description,
    amount,
    purchased_at
  );
};

const getById = async (id) => {
  return expenseModel.getById(id);
};

const getByUser = async (user_id) => {
  return expenseModel.getByUser(user_id);
};

module.exports = {
  create,
  deleteById,
  updateById,
  getById,
  getByUser,
};
