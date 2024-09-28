const generateToken = (id) => {
  return jwt.sign({ id: id }, "secret_key", { expiresIn: "1h" });
};

module.exports = generateToken;
