const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses.controller');


router.post('/', expenseController.create);
router.delete('/:expense_id', expenseController.deleteById);
router.put('/:expense_id', expenseController.updateById);

module.exports = router;
