import React from 'react';
import { usePersonContext } from '../../store/PersonContext';
import SearchBar from '../SearchBar/SearchBar';
import { DataGrid } from '@mui/x-data-grid';

// Définition des colonnes du tableau
const PersonList = () => {
  const { people, deletePerson } = usePersonContext();

  // État local pour les résultats de la recherche
  const [searchResults, setSearchResults] = React.useState(people);

  // Mettre à jour les résultats lors de l'initialisation ou lorsque les personnes changent
  React.useEffect(() => {
    setSearchResults(people);
  }, [people]);

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
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => deletePerson(params.row)}
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Supprimer
        </button>
      ),
    },
  ];

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
            rows={searchResults.map((person, index) => ({ id: index, ...person }))} // Ajout d'un 'id' pour chaque ligne
            columns={columns}
            sortingOrder={['asc', 'desc']}
            pageSize={10}
            pageSizeOptions={[5, 10]}
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
