import React from 'react';
import { ExpenseProvider } from './ExpenseContext';
import { CategoryProvider } from './CategoryContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ExpenseProvider>
      <CategoryProvider>
        {children}
      </CategoryProvider>
    </ExpenseProvider>
  );
};

export default AppProvider;