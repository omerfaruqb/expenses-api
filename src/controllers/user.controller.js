const userService = require("../services/user.service");
const { generateToken } = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    userService.create(name, email, password).then((result) => {
      const { statusCode, success, data, message } = result;

      const token = generateToken(data.id);

      if (success) {
        res.status(statusCode).json({ message, token: token });
      } else {
        res.status(statusCode).json({ message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    userService.getByEmail(email).then((result) => {
      const { statusCode, success, data, message } = result;

      if (success) {
        if (data.password === password) {
          const token = generateToken(data.id);
          res.status(statusCode).json({ message, token: token }); // Return the token
        } else {
          res.status(401).json({ message: "Invalid password" }); // Unauthorized
        }
      } else {
        res.status(statusCode).json({ message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signUp, logIn };