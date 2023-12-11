// Import de PropTypes depuis la bibliothèque prop-types
import PropTypes from 'prop-types';

// Définition du composant ErrorMessage
const ErrorMessage = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

// Validation des types de propriétés avec PropTypes
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired, // La prop "message" doit être une chaîne de caractères (String) et est requise
};

export default ErrorMessage;
