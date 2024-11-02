import React, { createContext, useState, useContext, useEffect } from 'react';

interface Expense {
  id: string;
  amount: number;
  category_id: number;
  date: string;
  description?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>; 
  deleteExpense: (id: string) => Promise<void>;
  editExpense: (id: string, updatedExpense: Omit<Expense, 'id'>) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/expenses`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error al cargar los gastos:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch(`${apiUrl}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (response.ok) {
        const newExpense = await response.json();
        setExpenses((prev) => [...prev, newExpense]);
      }
    } catch (error) {
      console.error('Error al agregar gasto:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/expenses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
    }
  };

  const editExpense = async (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch(`${apiUrl}/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExpense),
      });
      if (response.ok) {
        const updatedExpenseData = await response.json();
        setExpenses((prev) =>
          prev.map((expense) => (expense.id === id ? updatedExpenseData : expense))
        );
      }
    } catch (error) {
      console.error('Error al editar gasto:', error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses, addExpense, deleteExpense, editExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
