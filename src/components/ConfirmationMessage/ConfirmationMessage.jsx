import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ConfirmationMessage.scss';

// Définition du composant ConfirmationMessage
const ConfirmationMessage = ({ isVisible, onHide }) => {
  // Effet secondaire pour masquer le message après 3 secondes
  useEffect(() => {
    // Utilisation de setTimeout pour masquer le message après 3 secondes
    const timeoutId = setTimeout(() => {
      onHide();
    }, 3000);

    // Nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(timeoutId);
  }, [isVisible, onHide]);

  // Fonction pour gérer la fermeture immédiate
  const handleClose = () => {
    onHide();
  };

  // Rendu du composant
  return (
    <div className={`confirmation-message ${isVisible ? 'visible' : 'hidden'}`}>
      La personne a été enregistrée avec succès.
      {/* Ajout du bouton de fermeture rapide */}
      <button onClick={handleClose}>X</button>
    </div>
  );
};

// Validation des types de props avec PropTypes
ConfirmationMessage.propTypes = {
  isVisible: PropTypes.bool.isRequired, // isVisible doit être un booléen requis
  onHide: PropTypes.func.isRequired, // onHide doit être une fonction requise
};

// Exportation du composant ConfirmationMessage
export default ConfirmationMessage;
