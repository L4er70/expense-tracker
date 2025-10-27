import React from 'react';

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) return <div className="empty-state"><p>No expenses</p></div>;

  return (
    <div className="expense-list">
      {expenses.map((exp) => (
        <div key={exp._id} className="expense-item">
          <div>
            <h4>{exp.description}</h4>
            <p>{exp.category?.name} • {new Date(exp.date).toLocaleDateString()}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span className="expense-amount">${exp.amount.toFixed(2)}</span>
            <button className="btn btn-danger" onClick={() => onDelete(exp._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;