import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';

const ExpenseSummary: React.FC = () => {
  const { expenses, fetchExpenses } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext();

  const [totalByCategory, setTotalByCategory] = useState<{ [key: string]: number }>({});
  const [totalGeneral, setTotalGeneral] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      await fetchExpenses();
      await fetchCategories();
    };
    getData();
  }, []);

  useEffect(() => {
    const totals: { [key: string]: number } = {};
    let generalTotal = 0;

    expenses.forEach(expense => {
      generalTotal += expense.amount;
      const categoryKey = String(expense.category_id);
      totals[categoryKey] = (totals[categoryKey] || 0) + expense.amount;
    });

    setTotalByCategory(totals);
    setTotalGeneral(generalTotal);
  }, [expenses]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expense Summary</h2>
      <div className="alert alert-info">
        <strong>Total Spent:</strong> ${totalGeneral.toFixed(2)}
      </div>

      <h3 className="mt-4">Total by Category</h3>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <span className="badge bg-primary rounded-pill">
              ${totalByCategory[String(category.id)]?.toFixed(2) || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
