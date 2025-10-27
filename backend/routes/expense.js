const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const emailService = require('../services/emailService');

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category');
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new expense
router.post('/', async (req, res) => {
    const expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.categoryId
    });

    try {
        const newExpense = await expense.save();
        
        // Send email notification
        await emailService.sendExpenseNotification(newExpense);
        
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an expense
router.patch('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        if (req.body.description) expense.description = req.body.description;
        if (req.body.amount) expense.amount = req.body.amount;
        if (req.body.date) expense.date = req.body.date;
        if (req.body.categoryId) expense.category = req.body.categoryId;

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.remove();
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get expenses by category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const expenses = await Expense.find({ category: req.params.categoryId }).populate('category');
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;