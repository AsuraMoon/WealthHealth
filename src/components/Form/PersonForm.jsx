import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usePersonContext } from '../../store/PersonContext';
import { states } from '../../assets/data/state';
import { departmentOptions} from '../../assets/data/departmentOptions';

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

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ du prénom */}
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>

      {/* Champ du nom de famille */}
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>

      {/* Champ de la date de naissance avec le sélecteur de date */}
      <label>
        Date of Birth:
        <DatePicker selected={dob} onChange={(date) => setDob(date)} />
      </label>

      {/* Champ de la date de début avec le sélecteur de date */}
      <label>
        Start Date:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </label>

      {/* Champ de la rue */}
      <label>
        Street:
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
      </label>

      {/* Champ de la ville */}
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>

      {/* Champ de l'État avec une liste déroulante */}
      <label>
        State:
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Sélectionnez un État</option>
          {states.map((state, index) => (
            <option key={index} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
      </label>

      {/* Champ du code postal avec une validation pour n'accepter que des chiffres */}
      <label>
        Zip Code:
        <input
          type="text"
          pattern="\d*"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </label>

      {/* Champ du département avec une liste déroulante */}
      <label>
        Department:
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Sélectionnez un département</option>
          {departmentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {/* Bouton de soumission du formulaire */}
      <button type="submit">Ajouter la personne</button>
    </form>
  );
};

export default PersonForm;