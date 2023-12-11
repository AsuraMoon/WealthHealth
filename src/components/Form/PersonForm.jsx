// Importation des modules nécessaires depuis React et d'autres bibliothèques
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePersonContext } from '../../store/PersonContext';
import { states } from '../../assets/data/state';
import { departmentOptions } from '../../assets/data/departmentOptions';
import ErrorMessage from '../ErrorMessage/ErrorMessage'; // Import du composant ErrorMessage
import './PersonForm.scss'; // Import du fichier de styles

// Définition du composant PersonForm
const PersonForm = () => {
  // Utilisation du contexte pour accéder aux fonctions d'ajout de personne
  const { addPerson } = usePersonContext();

  // États locaux pour chaque champ du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');

  // États locaux pour gérer les messages d'erreur
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (!firstName) {
      setFirstNameError('Veuillez saisir le prénom.');
      return;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Veuillez saisir le nom de famille.');
      return;
    } else {
      setLastNameError('');
    }

    // ... (ajoutez des vérifications similaires pour d'autres champs)

    // Vérification du format de code postal
    const zipCodePattern = /^\d{5}$/;
    if (!zipCodePattern.test(zipCode)) {
      setZipCodeError('Le code postal doit contenir exactement 5 chiffres.');
      return;
    } else {
      setZipCodeError('');
    }

    // Création d'un objet représentant une personne avec les données du formulaire
    const newPerson = {
      firstName,
      lastName,
      dob,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    };

    // Appel de la fonction d'ajout de personne fournie par le contexte
    addPerson(newPerson);

    // Réinitialisation des champs après l'ajout de la personne
    setFirstName('');
    setLastName('');
    setDob(null);
    setStartDate(null);
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setDepartment('');
  };

  // Rendu du composant
  return (
    <form onSubmit={handleSubmit} className='WrapForm'>
      {/* Champ du prénom */}
      <label>
        Prénom :
      </label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <ErrorMessage message={firstNameError} />

      {/* Champ du nom de famille */}
      <label>
        Nom de famille :
      </label>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <ErrorMessage message={lastNameError} />

      {/* Champ de la date de naissance avec le sélecteur de date */}
      <label>
        Date de naissance :
      </label>
      <DatePicker selected={dob} onChange={(date) => setDob(date)} />

      {/* Champ de la date de début avec le sélecteur de date */}
      <label>
        Date de début :
      </label>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      {/* Champ de la rue */}
      <label>
        Rue :
      </label>
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

      {/* Champ de la ville */}
      <label>
        Ville :
      </label>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

      {/* Champ de l'État avec une liste déroulante */}
      <label>
        État :
      </label>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Sélectionnez un État</option>
        {states.map((state, index) => (
          <option key={index} value={state.abbreviation}>
            {state.name}
          </option>
        ))}
      </select>

      {/* Champ du code postal avec une validation pour n'accepter que des chiffres */}
      <label>
        Code postal :
      </label>
      <input type="text" pattern="\d*" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      <ErrorMessage message={zipCodeError} />

      {/* Champ du département avec une liste déroulante */}
      <label>
        Département :
      </label>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Sélectionnez un département</option>
        {departmentOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Bouton de soumission du formulaire */}
      <button type="submit" className='SubmitButton'>
        Ajouter la personne
      </button>
    </form>
  );
};

// Exportation du composant PersonForm
export default PersonForm;
