const express = require('express');
const Expense = require('../models/expense');
const router = express.Router();

// add expense
router.post('/', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
});

// edit expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'expense not found' });
    await expense.update(req.body);
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete expense
router.delete('/:id', async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);
  if (!expense) return res.status(404).json({ error: 'expense not found' });
  await expense.destroy();
  res.status(204).end();
});

module.exports = router;
