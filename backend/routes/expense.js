const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { sendBudgetAlert } = require('../services/emailService');

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().populate('category').sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/total', async (req, res) => {
  try {
    const result = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const total = result.length > 0 ? result[0].total : 0;
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/by-category', async (req, res) => {
  try {
    const result = await Expense.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
      { $unwind: '$categoryInfo' },
      { $project: { category: '$categoryInfo.name', total: 1, count: 1 } },
      { $sort: { total: -1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const newExpense = await expense.save();
    
    const result = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = result.length > 0 ? result[0].total : 0;
    const budgetLimit = parseFloat(process.env.BUDGET_LIMIT) || 1000;

    if (totalExpenses > budgetLimit) {
      await sendBudgetAlert(totalExpenses, budgetLimit);
    }

    const populated = await Expense.findById(newExpense._id).populate('category');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;