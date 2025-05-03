// src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import MenuList from '../components/menu/MenuList';
import { menuService } from '../services/menuService';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'tea', name: 'Tea' },
    { id: 'pastry', name: 'Pastries' },
    { id: 'breakfast', name: 'Breakfast' }
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await menuService.getMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError('Failed to load menu items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our selection of handcrafted coffee, tea, and delicious food</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading menu items...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <MenuList items={filteredItems} />
      )}
    </div>
  );
};

export default MenuPage;