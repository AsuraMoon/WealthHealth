import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  // État local pour le terme de recherche
  const [query, setQuery] = useState('');

  // Fonction de gestion des changements dans la barre de recherche
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      {/* Champ de recherche */}
      <label>
        Recherche :
        <input type="text" value={query} onChange={handleChange} />
      </label>
    </div>
  );
};

export default SearchBar;