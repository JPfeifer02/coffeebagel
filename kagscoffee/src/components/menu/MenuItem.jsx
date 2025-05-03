// src/components/menu/MenuItem.jsx
import React from 'react';

const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3>{item.name}</h3>
          <span className="price">${item.price.toFixed(2)}</span>
        </div>
        <p className="description">{item.description}</p>
        {item.dietary && (
          <div className="dietary-info">
            {item.dietary.map(tag => (
              <span key={tag} className="dietary-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;