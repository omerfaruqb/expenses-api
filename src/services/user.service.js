const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/generateToken");

const create = async (name, email, password) => {
  try {
    userModel.create(name, email, password).then((result) => {
      const { statusCode, success, data, message } = result; // data -> { id }

      if (success) {
        return {
          statusCode: statusCode,
          success: true,
          data: data,
          message: "User created",
        };
      } else {
        return { success, message };
      }
    });
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message,
    };
  }
};

const getByEmail = async (email) => {
  try {
    userModel.getByEmail(email).then((result) => {
      const { statusCode, success, data, message } = result;

      const token = generateToken({ id: data.id });

      if (success) {
        return {
          statusCode: statusCode,
          success: true,
          data: data,
          message: message,
        };
      } else {
        return {
          statusCode: statusCode,
          success: false,
          message: message,
        };
      }
    });
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message,
    };
  }
};

const getById = async (id) => {
  try {
    userModel.getById(id).then((result) => {
      const { statusCode, success, data, message } = result;

      if (success) {
        return {
          statusCode: statusCode,
          success: true,
          data: data,
          message: message,
        };
      } else {
        return { statusCode, success, message };
      }
    });
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    };
  }
};

const deleteById = async (id) => {
  try {
    userModel.deleteById(id).then((result) => {
      const { statusCode, success, message } = result;

      if (success) {
        return {
          statusCode: statusCode,
          success: true,
          message: message,
        };
      } else {
        return { statusCode, success, message };
      }
    });
  } catch (error) {
    return {
      statusCode: 500,
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
