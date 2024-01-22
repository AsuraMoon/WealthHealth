import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePersonContext } from '../../store/PersonContext';
import { states } from '../../assets/data/state';
import { departmentOptions } from '../../assets/data/departmentOptions';
import ErrorMessage from '@asuramoon/errormessage';
import './PersonForm.scss';
import ConfirmationModal from '@asuramoon/confirmationmodal';

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  // États locaux pour gérer les messages d'erreur
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  });

  // Fonction pour générer un identifiant unique
  const generateUniqueId = () => {
    // Génération d'un identifiant unique simple (utilisation du timestamp actuel)
    return Date.now();
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    const errors = {};

    if (!firstName) {
      errors.firstName = 'Veuillez saisir le prénom.';
    }

    if (!lastName) {
      errors.lastName = 'Veuillez saisir le nom de famille.';
    }

    if (!dob) {
      errors.dob = 'Veuillez sélectionner la date de naissance.';
    }

    if (!startDate) {
      errors.startDate = 'Veuillez sélectionner la date de début.';
    }

    if (!street) {
      errors.street = 'Veuillez saisir le nom de la rue.';
    }

    if (!city) {
      errors.city = 'Veuillez saisir le nom de la ville.';
    }

    if (!state) {
      errors.state = 'Veuillez sélectionner un État.';
    }

    // Vérification du format de code postal
    const zipCodePattern = /^\d{5}$/;
    if (!zipCodePattern.test(zipCode)) {
      errors.zipCode = 'Le code postal doit contenir exactement 5 chiffres.';
    }

    if (!department) {
      errors.department = 'Veuillez sélectionner un département.';
    }

    setErrorMessages(errors);

    // Si des erreurs sont présentes, interrompez le processus de soumission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Création d'un objet représentant une personne avec les données du formulaire
    const newPerson = {
      id: generateUniqueId(), // Ajout de l'identifiant unique
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

    // Afficher le message de confirmation
    setShowConfirmation(true);
  };

  // Rendu du composant
  return (
    <div>
      {/* Formulaire de saisie des informations de la personne */}
      <form onSubmit={handleSubmit} className='WrapForm'>
        {/* Champ du prénom */}
        <label>
          Prénom :
        </label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <ErrorMessage message={errorMessages.firstName || ''} />

        {/* Champ du nom de famille */}
        <label>
          Nom de famille :
        </label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <ErrorMessage message={errorMessages.lastName || ''} />

        {/* Champ de la date de naissance avec le sélecteur de date */}
        <label>
          Date de naissance :
        </label>
        <DatePicker selected={dob} onChange={(date) => setDob(date)} />
        <ErrorMessage message={errorMessages.dob || ''} />

        {/* Champ de la date de début avec le sélecteur de date */}
        <label>
          Date de début :
        </label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <ErrorMessage message={errorMessages.startDate || ''} />

        {/* Champ de la rue */}
        <label>
          Rue :
        </label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
        <ErrorMessage message={errorMessages.street || ''} />

        {/* Champ de la ville */}
        <label>
          Ville :
        </label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <ErrorMessage message={errorMessages.city || ''} />

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
        <ErrorMessage message={errorMessages.state || ''} />

        {/* Champ du code postal avec une validation pour n'accepter que des chiffres */}
        <label>
          Code postal :
        </label>
        <input type="text" pattern="\d*" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        <ErrorMessage message={errorMessages.zipCode || ''} />

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
        <ErrorMessage message={errorMessages.department || ''} />

        {/* Bouton de soumission du formulaire */}
        <button type="submit" className='SubmitButton'>
          Ajouter la personne
        </button>
      </form>

      {/* Message de confirmation */}
      {showConfirmation && (
        <ConfirmationModal
          isVisible={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

// Exportation du composant PersonForm
export default PersonForm;
