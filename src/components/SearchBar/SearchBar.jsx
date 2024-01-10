import { useState } from 'react';
import PropTypes from 'prop-types';

// Définition du composant SearchBar
const SearchBar = ({ onSearch }) => {
  // État local pour le terme de recherche
  const [query, setQuery] = useState('');

  // Fonction de gestion des changements dans la barre de recherche
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Rendu du composant
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

// Validation des types de propriétés
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // La prop onSearch doit être une fonction et est obligatoire
};

// Exportation du composant SearchBar
export default SearchBar;
