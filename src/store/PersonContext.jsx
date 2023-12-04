import { createContext, useContext, useReducer } from 'react';

const PersonContext = createContext();

const initialState = {
  people: [],
};

const personReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      return {
        ...state,
        people: [...state.people, action.payload],
      };
    default:
      return state;
  }
};

const PersonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personReducer, initialState);

  const addPerson = (person) => {
    dispatch({ type: 'ADD_PERSON', payload: person });
  };

  return (
    <PersonContext.Provider value={{ people: state.people, addPerson }}>
      {children}
    </PersonContext.Provider>
  );
};

const usePersonContext = () => {
  return useContext(PersonContext);
};

export { PersonProvider, usePersonContext };
