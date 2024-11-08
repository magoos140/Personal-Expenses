import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryForm from './components/CategoryForm';
import ExpenseChart from './components/ExpenseChart';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  // Estado para los filtros
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const openExpenseModal = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);
  const openCategoryModal = () => setCategoryModalOpen(true);
  const closeCategoryModal = () => setCategoryModalOpen(false);

  return (
    <AppProvider>
      <div className="App container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-primary" onClick={openExpenseModal}>
            Add Expense
          </button>
          <h1 className="text-center mb-0">Personal Expenses</h1>
          <button className="btn btn-secondary" onClick={openCategoryModal}>
            Add Category
          </button>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column">
              <ExpenseSummary 
                selectedCategory={selectedCategory} 
                startDate={startDate} 
                endDate={endDate} 
              />
              <ExpenseChart 
                selectedCategory={selectedCategory} 
                startDate={startDate} 
                endDate={endDate} 
              />
            </div>
          </div>
          <div className="col-12 col-md-8">
            <ExpenseList
              selectedCategory={selectedCategory}
              startDate={startDate}
              endDate={endDate}
              setSelectedCategory={setSelectedCategory}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>

        <Modal title="Add Expense" isOpen={isExpenseModalOpen} onClose={closeExpenseModal}>
          <ExpenseForm />
        </Modal>

        <Modal title="Add Category" isOpen={isCategoryModalOpen} onClose={closeCategoryModal}>
          <CategoryForm />
        </Modal>
      </div>
    </AppProvider>
  );
};

export default App;
