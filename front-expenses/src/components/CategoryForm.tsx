import React, { useState } from 'react';
import { useCategoryContext } from '../context/CategoryContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CategoryForm: React.FC = () => {
  const { addCategory } = useCategoryContext();
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setErrorMessage('Category name cannot be empty.');
      return;
    }

    try {
      await addCategory(categoryName);
      setCategoryName('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error adding category.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded shadow">
      <h3 className="mb-4">Add Category</h3>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row className="mb-3">
        <Col md={8}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Button variant="primary" type="submit" className="mt-4">
            Add Category
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
