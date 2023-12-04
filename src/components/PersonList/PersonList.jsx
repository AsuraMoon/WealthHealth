import { useState } from 'react';
import { usePersonContext } from '../../store/PersonContext';
import SearchBar from '../SearchBar/SearchBar';
// Fonctions de tri pour chaque champ
const sortFunctions = {
  firstName: (a, b) => a.firstName.localeCompare(b.firstName),
  lastName: (a, b) => a.lastName.localeCompare(b.lastName),
  dob: (a, b) => (a.dob && b.dob ? a.dob.getTime() - b.dob.getTime() : 0),
  startDate: (a, b) => (a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0),
  street: (a, b) => a.street.localeCompare(b.street),
  city: (a, b) => a.city.localeCompare(b.city),
  state: (a, b) => a.state.localeCompare(b.state),
  zipCode: (a, b) => a.zipCode.localeCompare(b.zipCode),
  department: (a, b) => a.department.localeCompare(b.department),
};

const PersonList = () => {
  // Utilisation du contexte pour accéder à la liste des personnes
  const { people } = usePersonContext();

  // État local pour les résultats de la recherche
  const [searchResults, setSearchResults] = useState(people);

  // État local pour la configuration de tri
  const [sortConfig, setSortConfig] = useState({ field: null, order: 'asc' });

  // Fonction pour obtenir la classe CSS pour le tri
  const getClassNamesFor = (name) => {
    if (!sortConfig.field) {
      return;
    }
    return sortConfig.field === name ? sortConfig.order : undefined;
  };

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

  // Fonction de gestion du tri
  const requestSort = (field) => {
    let order = 'asc';
    if (sortConfig.field === field && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ field, order });
    sortResults(field, order);
  };

  // Fonction de tri des résultats
  const sortResults = (field, order) => {
    const sortedResults = [...searchResults].sort((a, b) => {
      return order === 'asc' ? sortFunctions[field](a, b) : sortFunctions[field](b, a);
    });

    setSearchResults(sortedResults);
  };

  return (
    <div>
      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Boutons de tri pour chaque champ */}
      <div>
        <button onClick={() => requestSort('firstName')} className={getClassNamesFor('firstName')}>
          Trier par Prénom
        </button>
        <button onClick={() => requestSort('lastName')} className={getClassNamesFor('lastName')}>
          Trier par Nom
        </button>
        <button onClick={() => requestSort('dob')} className={getClassNamesFor('dob')}>
          Trier par Date de Naissance
        </button>
        <button onClick={() => requestSort('startDate')} className={getClassNamesFor('startDate')}>
          Trier par Date de Début
        </button>
        <button onClick={() => requestSort('street')} className={getClassNamesFor('street')}>
          Trier par Rue
        </button>
        <button onClick={() => requestSort('city')} className={getClassNamesFor('city')}>
          Trier par Ville
        </button>
        <button onClick={() => requestSort('state')} className={getClassNamesFor('state')}>
          Trier par État
        </button>
        <button onClick={() => requestSort('zipCode')} className={getClassNamesFor('zipCode')}>
          Trier par Code Postal
        </button>
        <button onClick={() => requestSort('department')} className={getClassNamesFor('department')}>
          Trier par Département
        </button>
      </div>

      {/* Liste des personnes */}
      <h2>Liste des employés</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((person, index) => (
            <li key={index}>
              <strong>{person.firstName} {person.lastName}</strong><br />
              <strong>Date de naissance :</strong> {person.dob ? person.dob.toLocaleDateString() : ''}<br />
              <strong>Date de début :</strong> {person.startDate ? person.startDate.toLocaleDateString() : ''}<br />
              <strong>Rue :</strong> {person.street}<br />
              <strong>Ville :</strong> {person.city}<br />
              <strong>État :</strong> {person.state}<br />
              <strong>Code postal :</strong> {person.zipCode}<br />
              <strong>Département :</strong> {person.department}<br />
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun employé trouvé.</p>
      )}
    </div>
  );
};

export default PersonList;