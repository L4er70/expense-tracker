import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

// Import API functions
import {
  getCategories,
  createCategory,
  deleteCategory,
  getExpenses,
  getTotalExpenses,
  getExpensesByCategory,
  createExpense,
  deleteExpense
} from './services/api';

// Import components
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategorySummary from './components/CategorySummary';

const BUDGET_LIMIT = 2000; 

function App() {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // State for expenses
  const [expenses, setExpenses] = useState([]);
  const [expensesLoading, setExpensesLoading] = useState(true);

  // State for totals and summary
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(true);

  
  useEffect(() => {
    fetchCategories();
    fetchExpenses();
    fetchTotalExpenses();
    fetchExpensesByCategory();
  }, []);

  
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await createCategory(categoryData);
      setCategories([...categories, newCategory]);
      toast.success('Category created successfully!');
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error.response?.data?.message || 'Failed to create category');
      throw error;
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  
  const fetchExpenses = async () => {
    try {
      setExpensesLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast.error('Failed to load expenses');
    } finally {
      setExpensesLoading(false);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const data = await getTotalExpenses();
      setTotalExpenses(data.total);
    } catch (error) {
      console.error('Error fetching total:', error);
    }
  };

  const fetchExpensesByCategory = async () => {
    try {
      setSummaryLoading(true);
      const data = await getExpensesByCategory();
      setExpensesByCategory(data);
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleCreateExpense = async (expenseData) => {
    try {
      const newExpense = await createExpense(expenseData);
      setExpenses([newExpense, ...expenses]);
      
      // Refresh totals and summary
      await fetchTotalExpenses();
      await fetchExpensesByCategory();
      
      toast.success('Expense added successfully!');
      
      // Check if over budget
      const newTotal = totalExpenses + expenseData.amount;
      if (newTotal > BUDGET_LIMIT) {
        toast.error(`⚠️ Budget exceeded! Total: $${newTotal.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error creating expense:', error);
      toast.error(error.response?.data?.message || 'Failed to create expense');
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
      
      // Refresh totals and summary
      await fetchTotalExpenses();
      await fetchExpensesByCategory();
      
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };


  return (
    <div className="app">
      <Toaster position="top-right" />

      <header className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your expenses and stay within budget</p>
      </header>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <div className="stat-value">${totalExpenses.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <h3>Budget Limit</h3>
          <div className="stat-value">${BUDGET_LIMIT.toFixed(2)}</div>
        </div>
        <div className={`stat-card ${totalExpenses > BUDGET_LIMIT ? 'over-budget' : ''}`}>
          <h3>Remaining</h3>
          <div className="stat-value">
            ${(BUDGET_LIMIT - totalExpenses).toFixed(2)}
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Categories</h3>
          <div className="stat-value">{categories.length}</div>
        </div>
      </div>

      {/* Budget Alert */}
      {totalExpenses > BUDGET_LIMIT && (
        <div className="alert alert-warning">
          ⚠️ <strong>Budget Alert:</strong> You have exceeded your budget limit by $
          {(totalExpenses - BUDGET_LIMIT).toFixed(2)}!
        </div>
      )}

      {/* Category Summary */}
      <div className="card">
        <h2>📊 Spending by Category</h2>
        <CategorySummary
          expensesByCategory={expensesByCategory}
          loading={summaryLoading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Categories Section */}
        <div className="card">
          <h2>📁 Categories</h2>
          <CategoryForm onCategoryCreated={handleCreateCategory} />
          <div style={{ marginTop: '20px' }}>
            <CategoryList
              categories={categories}
              onDelete={handleDeleteCategory}
              loading={categoriesLoading}
            />
          </div>
        </div>

        {/* Expenses Section */}
        <div className="card">
          <h2>💵 Add Expense</h2>
          <ExpenseForm
            categories={categories}
            onExpenseCreated={handleCreateExpense}
          />
        </div>
      </div>

      {/* Expenses List */}
      <div className="card">
        <h2>📝 Recent Expenses</h2>
        <ExpenseList
          expenses={expenses}
          onDelete={handleDeleteExpense}
          loading={expensesLoading}
        />
      </div>
    </div>
  );
}

export default App;