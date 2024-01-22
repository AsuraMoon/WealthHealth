// ConfirmationModal.jsx

// Importation des fonctionnalités nécessaires depuis React
import { useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes pour la validation des propriétés
import './ConfirmationModal.scss';  // Import du fichier de style SCSS

// Définition du composant ConfirmationModal
const ConfirmationModal = ({ isVisible, onHide }) => {
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
    // Ajoutez la classe 'overlay-visible' lorsque la popup est visible
    <div className={`confirmation-overlay ${isVisible ? 'overlay-visible' : ''}`}>
      {/* Conteneur du message de confirmation */}
      <div className={`confirmation-message ${isVisible ? 'visible' : 'hidden'}`}>
        La personne a été enregistrée avec succès.
        {/* Bouton pour fermer la popup */}
        <button onClick={handleClose}>X</button>
      </div>
    </div>
  );
};

// Validation des types de propriétés avec PropTypes
ConfirmationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired, // isVisible doit être un booléen requis
  onHide: PropTypes.func.isRequired, // onHide doit être une fonction requise
};

// Exportation du composant ConfirmationModal
export default ConfirmationModal;
