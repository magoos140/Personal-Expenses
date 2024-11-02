import React, { useEffect, useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';
import { Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Modal from '../components/Modal';

interface ExpenseListProps {
  selectedCategory: number | null;
  startDate: string;
  endDate: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  selectedCategory,
  startDate,
  endDate,
  setSelectedCategory,
  setStartDate,
  setEndDate,
}) => {
  const { expenses, deleteExpense, fetchExpenses, editExpense } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext();

  const [editingExpense, setEditingExpense] = useState<{ id: string; amount: number; category_id: number; date: string; description?: string } | null>(null);
  const [formData, setFormData] = useState<{ amount: number; category_id: number; date: string; description?: string }>({
    amount: 0,
    category_id: 0,
    date: '',
    description: '',
  });

  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      await fetchExpenses();
    };
    const getCategories = async () => {
      await fetchCategories();
    };
    getExpenses();
    getCategories();
  }, []);

  useEffect(() => {
    let filtered = expenses;

    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category_id === selectedCategory);
    }

    if (startDate) {
      filtered = filtered.filter(expense => new Date(expense.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(expense => new Date(expense.date) <= new Date(endDate));
    }

    setFilteredExpenses(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const handleEditClick = (expense: any) => {
    setEditingExpense(expense);
    setFormData({ amount: expense.amount, category_id: expense.category_id, date: expense.date, description: expense.description || '' });
    setIsEditModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      await editExpense(editingExpense.id, formData);
      setEditingExpense(null);
      setFormData({ amount: 0, category_id: 0, date: '', description: '' });
      setIsEditModalOpen(false);
    }
  };

  const closeEditModal = () => {
    setEditingExpense(null);
    setIsEditModalOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="p-3">
      <h2>Expense List</h2>

      <Form className="mb-3">
        <Row className="align-items-center">
          <Col xs={12} md={3}>
            <Form.Group controlId="categorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3} className="d-flex align-items-end">
            <Button variant="secondary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </Col>
        </Row>
      </Form>

      {filteredExpenses.length === 0 ? (
        <Alert variant="info">No expenses have been added yet.</Alert>
      ) : (
        <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
          <div className="d-none d-md-block">
            <Table striped bordered hover responsive>
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
                {filteredExpenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.amount}</td>
                    <td>{categories.find(category => Number(category.id) === expense.category_id)?.name || 'Category not found'}</td>
                    <td>{new Date(expense.date).toLocaleDateString('en-GB')}</td>
                    <td>{expense.description || '-'}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditClick(expense)} className="me-2">Edit</Button>
                      <Button variant="danger" onClick={() => deleteExpense(expense.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-md-none">
            {filteredExpenses.map(expense => (
              <div key={expense.id} className="border p-3 mb-2">
                <h5>{expense.description || 'No description'}</h5>
                <p><strong>Amount:</strong> {expense.amount}</p>
                <p><strong>Category:</strong> {categories.find(category => Number(category.id) === expense.category_id)?.name || 'Category not found'}</p>
                <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString('en-GB')}</p>
                <Button variant="primary" onClick={() => handleEditClick(expense)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => deleteExpense(expense.id)}>Delete</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingExpense && (
        <Modal title="Edit Expense" isOpen={isEditModalOpen} onClose={closeEditModal}>
          <Form onSubmit={handleFormSubmit} className="mt-4">
            <Row>
              <Col xs={12} md={3}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="editCategorySelect">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
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
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="editDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className='mt-4'>
              Save Changes
            </Button>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ExpenseList;
