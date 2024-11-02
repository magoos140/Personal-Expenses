import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';

interface ExpenseSummaryProps {
  selectedCategory: number | null;
  startDate: string;
  endDate: string;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ selectedCategory, startDate, endDate }) => {
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
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const isCategoryMatch = selectedCategory ? expense.category_id === selectedCategory : true;
      const isStartDateMatch = startDate ? expenseDate >= new Date(startDate) : true;
      const isEndDateMatch = endDate ? expenseDate <= new Date(endDate) : true;
      return isCategoryMatch && isStartDateMatch && isEndDateMatch;
    });


    const totals: { [key: string]: number } = {};
    let generalTotal = 0;

    filteredExpenses.forEach(expense => {
      generalTotal += expense.amount;
      const categoryKey = String(expense.category_id);
      totals[categoryKey] = (totals[categoryKey] || 0) + expense.amount;
    });

    setTotalByCategory(totals);
    setTotalGeneral(generalTotal);
  }, [expenses, selectedCategory, startDate, endDate]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Expense Summary</h2>
      <div className="alert alert-info text-center">
        <strong>Total Spent:</strong> ${totalGeneral.toFixed(2)}
      </div>

      <h3 className="mt-4 text-center">Total by Category</h3>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="text-truncate" style={{ maxWidth: '70%' }}>{category.name}</span>
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
