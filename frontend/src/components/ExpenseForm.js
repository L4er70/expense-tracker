import React, { useState } from 'react';

const ExpenseForm = ({ categories, onExpenseCreated }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return alert('Fill all fields');
    try {
      await onExpenseCreated({ amount: parseFloat(amount), description, category });
      setAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      alert('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount ($) *</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" />
      </div>
      <div className="form-group">
        <label>Description *</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Category *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={categories.length === 0}>
          <option value="">Select</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={categories.length === 0}>Add</button>
    </form>
  );
};

export default ExpenseForm;