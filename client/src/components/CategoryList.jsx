import React from 'react';

function CategoryItem({ cat, onSelect, selectedId }) {
  return (
    <li style={{ marginBottom: 6 }}>
      <div>
        <button
          onClick={() => onSelect(cat._id)}
          style={{ fontWeight: cat._id === selectedId ? 'bold' : 'normal', cursor: 'pointer' }}
        >
          {cat.name}
        </button>
      </div>
      {cat.children && cat.children.length > 0 && (
        <ul style={{ marginLeft: 14 }}>
          {cat.children.map(c => (
            <CategoryItem key={c._id} cat={c} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CategoryList({ categories = [], onSelect, selectedId }) {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {categories.map(cat => (
        <CategoryItem key={cat._id} cat={cat} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </ul>
  );
}
