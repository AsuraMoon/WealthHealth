// Importation des modules nécessaires depuis React et react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation du contexte PersonProvider qui gère les données relatives aux personnes
import { PersonProvider } from './store/PersonContext';

// Importation du composant Header qui représente l'en-tête de l'application
import Header from './layout/Header';

// Importation du composant PersonForm qui représente le formulaire d'ajout de personne
import PersonForm from './components/Form/PersonForm';

// Importation de la page PersonListPage qui affiche la liste des personnes
import PersonListPage from './pages/ListPage/PersonListPage';

// Importation des styles CSS de l'application
import "./App.css"

// Définition du composant principal de l'application, App
const App = () => {
  // Retourne la structure de l'application
  return (
    // Enveloppe l'application avec le contexte PersonProvider pour partager les données sur les personnes
    <PersonProvider>
      {/* Utilisation du composant Router pour gérer la navigation à l'intérieur de l'application */}
      <Router basename="/WealthHealth">
        {/* Structure globale de l'application */}
        <>
          {/* En-tête de l'application qui contient le logo et la barre de navigation */}
          <Header />

          {/* Configuration des routes de l'application avec le composant Routes */}
          <Routes>
            {/* Définition de la route pour la page d'accueil, liée au composant PersonForm */}
            <Route path="/" element={<PersonForm />} />

            {/* Définition de la route pour la page de liste des employés, liée au composant PersonListPage */}
            <Route path="/employee-list" element={<PersonListPage />} />
          </Routes>
        </>
      </Router>
    </PersonProvider>
  );
};

// Exportation du composant App pour qu'il puisse être utilisé dans d'autres parties de l'application
export default App;
