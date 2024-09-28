const express = require('express');
const userRouter = require('./src/routes/user.routes');
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
