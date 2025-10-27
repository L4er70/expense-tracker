import React from 'react';

const CategorySummary = ({ expensesByCategory }) => {
  if (expensesByCategory.length === 0) return <div className="empty-state"><p>No data</p></div>;

  return (
    <div className="category-summary">
      {expensesByCategory.map((item) => (
        <div key={item._id} className="category-summary-item">
          <div>
            <h4>{item.category}</h4>
            <span className="summary-count">{item.count} expense(s)</span>
          </div>
          <span className="summary-amount">${item.total.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySummary;