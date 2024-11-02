import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { useCategoryContext } from '../context/CategoryContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenseContext();
  const { categories, fetchCategories } = useCategoryContext();
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (parsedAmount <= 0) {
      setErrorMessage('Amount must be greater than 0.');
      return;
    }

    if (categoryId === '') {
      setErrorMessage('Please select a valid category.');
      return;
    }

    const newExpense = {
      amount: parsedAmount,
      category_id: categoryId,
      date,
      description,
    };

    await addExpense(newExpense);
    setAmount('');
    setCategoryId('');
    setDate('');
    setDescription('');
    setErrorMessage('');
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded shadow">
      <h3 className="mb-4">Add Expense</h3>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
              required
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="categoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="description">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="mt-3">
        Add Expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
