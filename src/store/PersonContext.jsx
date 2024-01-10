// Importation des fonctionnalités nécessaires depuis React
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

// Création d'un contexte pour stocker les informations sur les personnes
const PersonContext = createContext();

// État initial du contexte
const initialState = {
  people: [], // Tableau initial vide pour stocker les informations sur les personnes
};

// Réducteur pour gérer les actions sur le contexte
const personReducer = (state, action) => {
  switch (action.type) {
    // Si l'action est d'ajouter une personne
    case 'ADD_PERSON':
      return {
        ...state,
        people: [...state.people, action.payload], // Ajout de la nouvelle personne au tableau existant
      };
    default:
      return state;
  }
};

// Fournisseur de contexte pour encapsuler l'état et les fonctions liées
const PersonProvider = ({ children }) => {
  // Utilisation de useReducer pour gérer l'état avec le réducteur
  const [state, dispatch] = useReducer(personReducer, initialState);

  // Fonction pour ajouter une personne à l'état
  const addPerson = (person) => {
    dispatch({ type: 'ADD_PERSON', payload: person }); // Appel du réducteur avec l'action d'ajouter une personne
  };

  // Fournir le contexte avec l'état et les fonctions associées
  return (
    <PersonContext.Provider value={{ people: state.people, addPerson }}>
      {children} {/* Affiche les composants enfants enveloppés par ce fournisseur de contexte */}
    </PersonContext.Provider>
  );
};

// Validation des types de propriétés pour le composant PersonProvider
PersonProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Propriété 'children' doit être de type 'node' et obligatoire
};

// Hook personnalisé pour utiliser le contexte
const usePersonContext = () => {
  return useContext(PersonContext); // Utilise le hook useContext pour accéder au contexte
};

// Exportation des composants et du hook personnalisé
export { PersonProvider, usePersonContext };
