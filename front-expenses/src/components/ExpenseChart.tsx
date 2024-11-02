import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';

interface ExpenseChartProps {
  selectedCategory: number | null;
  startDate: string;
  endDate: string;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ selectedCategory, startDate, endDate }) => {
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

    // Filtra las expenses en función de los filtros seleccionados
    const filteredExpenses = expenses.filter(expense => {
      const isCategoryMatch = selectedCategory ? expense.category_id === selectedCategory : true;
      const isDateMatch = startDate && endDate ? 
        new Date(expense.date) >= new Date(startDate) && new Date(expense.date) <= new Date(endDate) 
        : true;
      return isCategoryMatch && isDateMatch;
    });

    filteredExpenses.forEach(expense => {
      const categoryKey = String(expense.category_id);
      totals[categoryKey] = (totals[categoryKey] || 0) + expense.amount;
    });

    setTotalByCategory(totals);
  }, [expenses, selectedCategory, startDate, endDate]);

  const chartData = categories.map(category => ({
    name: category.name,
    amount: totalByCategory[String(category.id)] || 0,
  })).filter(data => data.amount > 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

  return (
    <div className="container mt-4">
      <div>
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
