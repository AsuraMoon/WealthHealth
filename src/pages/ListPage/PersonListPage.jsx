import PersonList from '../../components/PersonList/PersonList';

// Définition du composant PersonListPage
const PersonListPage = () => {
  return (
    <div>
      {/* En-tête de la page */}
      <h2>Liste des Employés</h2>

      {/* Contenu de la page, incluant le composant PersonList */}
      <div>
        <PersonList />
      </div>
    </div>
  );
};

// Exportation du composant PersonListPage
export default PersonListPage;
