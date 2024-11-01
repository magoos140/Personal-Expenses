import React from 'react';
import AppProvider from './context/AppProvider'; 
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App">
        <h1>Personal Expenses</h1>
        <ExpenseForm />
        <ExpenseList />
      </div>
    </AppProvider>
  );
};

export default App;
