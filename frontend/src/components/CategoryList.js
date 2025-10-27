import React from 'react';

const CategoryList = ({ categories, onDelete }) => {
  if (categories.length === 0) return <div className="empty-state"><p>No categories</p></div>;

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div key={cat._id} className="category-item">
          <div>
            <h4>{cat.name}</h4>
            {cat.description && <p>{cat.description}</p>}
          </div>
          <button className="btn btn-danger" onClick={() => onDelete(cat._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;