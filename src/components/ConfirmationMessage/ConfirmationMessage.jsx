// ConfirmationMessage.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ConfirmationMessage.scss';

const ConfirmationMessage = ({ isVisible, onHide }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onHide();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isVisible, onHide]);

  const handleClose = () => {
    onHide();
  };

  return (
    // Ajoutez la classe 'overlay-visible' lorsque la popup est visible
    <div className={`confirmation-overlay ${isVisible ? 'overlay-visible' : ''}`}>
      <div className={`confirmation-message ${isVisible ? 'visible' : 'hidden'}`}>
        La personne a été enregistrée avec succès.
        <button onClick={handleClose}>X</button>
      </div>
    </div>
  );
};

ConfirmationMessage.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ConfirmationMessage;
