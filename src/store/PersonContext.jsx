import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

// Création d'un contexte pour stocker les informations sur les personnes
const PersonContext = createContext();

// État initial du contexte
const initialState = {
  people: JSON.parse(localStorage.getItem('people'))?.map((person) => ({
    ...person,
    dob: person.dob ? new Date(person.dob) : null, // Convertir 'dob' en objet Date
    startDate: person.startDate ? new Date(person.startDate) : null, // Convertir 'startDate' en objet Date
  })) || [], // Si le localStorage est vide, initialisez avec un tableau vide
};

// Réducteur pour gérer les actions sur le contexte
const personReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      return {
        ...state,
        people: [...state.people, action.payload], // Ajout de la nouvelle personne au tableau existant
      };
    case 'DELETE_PERSON':
      return {
        ...state,
        people: state.people.filter((person) =>
          person.firstName !== action.payload.firstName ||
          person.lastName !== action.payload.lastName ||
          person.dob !== action.payload.dob // Comparer tous les champs uniques
        ),
      };
    default:
      return state;
  }
};

// Fournisseur de contexte pour encapsuler l'état et les fonctions liées
const PersonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  // Mettre à jour le localStorage à chaque fois que 'state.people' change
  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(state.people));
  }, [state.people]);

  // Fonction pour ajouter une personne à l'état
  const addPerson = (person) => {
    dispatch({ type: 'ADD_PERSON', payload: person });
  };

  // Fonction pour supprimer une personne de l'état
  const deletePerson = (person) => {
    dispatch({ type: 'DELETE_PERSON', payload: person });
  };

  return (
    <PersonContext.Provider value={{ people: state.people, addPerson, deletePerson }}>
      {children}
    </PersonContext.Provider>
  );
};

// Validation des types de propriétés pour le composant PersonProvider
PersonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour utiliser le contexte
const usePersonContext = () => {
  return useContext(PersonContext);
};

export { PersonProvider, usePersonContext };
