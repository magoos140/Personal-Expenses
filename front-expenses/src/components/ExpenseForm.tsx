import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext();
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId === '') {
      alert('Please select a valid category.');
      return;
    }

    const newExpense = {
      amount,
      category_id: categoryId,
      date,
      description,
    };

    await addExpense(newExpense);
    setAmount(0);
    setCategoryId('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        placeholder="Amount"
        required
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
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
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      ></textarea>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
