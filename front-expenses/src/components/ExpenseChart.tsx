import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';

const ExpenseChart: React.FC = () => {
  const { expenses, fetchExpenses } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext();

  const [totalByCategory, setTotalByCategory] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getData = async () => {
      await fetchExpenses();
      await fetchCategories();
    };
    getData();
  }, []);

  useEffect(() => {
    const totals: { [key: string]: number } = {};

    expenses.forEach(expense => {
      const categoryKey = String(expense.category_id);
      totals[categoryKey] = (totals[categoryKey] || 0) + expense.amount;
    });

    setTotalByCategory(totals);
  }, [expenses]);

  const chartData = categories.map(category => ({
    name: category.name,
    amount: totalByCategory[String(category.id)] || 0,
  })).filter(data => data.amount > 0); // Filter out categories with 0 amount

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Expenses by Category Chart</h3>
      <div className="card">
        <div className="card-body">
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
