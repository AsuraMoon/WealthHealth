import React from 'react';
import { usePersonContext } from '../../store/PersonContext';
import SearchBar from '../SearchBar/SearchBar';
import { DataGrid } from '@mui/x-data-grid';

// Définition des colonnes du tableau
const columns = [
  { field: 'firstName', headerName: 'Prénom', flex: 1 },
  { field: 'lastName', headerName: 'Nom', flex: 1 },
  {
    field: 'dob',
    headerName: 'Date de Naissance',
    type: 'date',
    flex: 1,
  },
  { field: 'department', headerName: 'Département', flex: 1 },
  {
    field: 'startDate',
    headerName: 'Date de Début',
    type: 'date',
    flex: 1,
  },
  { field: 'street', headerName: 'Rue', flex: 1 },
  { field: 'city', headerName: 'Ville', flex: 1 },
  { field: 'state', headerName: 'État', flex: 1 },
  { field: 'zipCode', headerName: 'Code Postal', flex: 1 },
];

const PersonList = () => {
  // Utilisation du contexte pour accéder à la liste des personnes
  const { people } = usePersonContext();

  // État local pour les résultats de la recherche
  const [searchResults, setSearchResults] = React.useState(people);

  // Fonction de recherche qui filtre les personnes en fonction d'un terme de recherche
  const handleSearch = (query) => {
    const filteredPeople = people.filter((person) => {
      const values = Object.keys(person).map((key) => {
        if (key === 'dob' || key === 'startDate') {
          return person[key] ? person[key].toLocaleDateString() : '';
        }
        return String(person[key]).toLowerCase();
      });

      return values.some((value) => value.includes(query.toLowerCase()));
    });

    setSearchResults(filteredPeople);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gridTemplateRows: 'auto 1fr', height: '100%' }}>
      {/* En-tête du composant */}
      <div style={{ gridRow: '1', gridColumn: '1', padding: '15px' }}>
        <h2>Liste des employés</h2>
      </div>

      {/* Barre de recherche à droite */}
      <div style={{ gridRow: '1', gridColumn: '2', padding: '15px' }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Tableau de résultats en dessous */}
      <div style={{ gridRow: '2', gridColumn: '1 / span 2', height: '100%' }}>
        {searchResults.length > 0 ? (
          <DataGrid
            rows={searchResults}
            columns={columns}
            sortingOrder={['asc', 'desc']}
            pageSize={10}  // Définir la taille de page par défaut ici
            pageSizeOptions={[5, 10]}  // Inclure la taille de page par défaut dans les options
            autoHeight
          />
        ) : (
          <div style={{ height: 400, width: '100%' }}>Aucun employé trouvé.</div>
        )}
      </div>
    </div>
  );
};

export default PersonList;
