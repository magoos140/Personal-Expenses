import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext'; 

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, fetchExpenses, editExpense } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext(); 

  const [editingExpense, setEditingExpense] = useState<{ id: string; amount: number; category_id: number; date: string; description?: string } | null>(null);
  const [formData, setFormData] = useState<{ amount: number; category_id: number; date: string; description?: string }>({
    amount: 0,
    category_id: 0,
    date: '',
    description: '',
  });

  useEffect(() => {
    const getExpenses = async () => {
      await fetchExpenses();
    };
    const getCategories = async () => {
      await fetchCategories();
    };
    getExpenses();
    getCategories();
  }, [fetchExpenses, fetchCategories]);

  const handleEditClick = (expense: any) => {
    setEditingExpense(expense);
    setFormData({ amount: expense.amount, category_id: expense.category_id, date: expense.date, description: expense.description || '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      await editExpense(editingExpense.id, formData);
      setEditingExpense(null); 
      setFormData({ amount: 0, category_id: 0, date: '', description: '' }); 
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.amount}</td>
              <td>{categories.find(category => Number(category.id) === expense.category_id)?.name || 'Category not found'}</td> 
              <td>{expense.date}</td>
              <td>{expense.description || '-'}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                <button onClick={() => handleEditClick(expense)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingExpense && (
        <form onSubmit={handleFormSubmit}>
          <h3>Edit Expense</h3>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            required
          />
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingExpense(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ExpenseList;
