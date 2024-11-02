import React, { createContext, useState, useContext, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
      if (!response.ok) {
        throw new Error('Error fetching categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error('Error adding category');
      }
      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory]); 
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
