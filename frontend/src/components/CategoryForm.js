import React, { useState } from 'react';

const CategoryForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Enter category name');
    setLoading(true);
    try {
      await onCategoryCreated({ name, description });
      setName('');
      setDescription('');
    } catch (error) {
      alert('Error creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default CategoryForm;