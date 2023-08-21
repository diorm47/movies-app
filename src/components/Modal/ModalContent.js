import './ModalContent.css';
import failImage from '../../images/fail.png';
import { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const ModalContent = ({ onClose, modalText }) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);

  return (
      <div className="modal__container" ref={modalRef}>
        <div className="modal__content">
          <button
            className="modal__close"
            type="button"
            aria-label="Закрыть модальное окно"
            onClick={onClose}
          />
          <img
            className="modal__image"
            src={failImage}
            alt="Ошибка"
          />
          <h2 className={"modal__title"}>
            {modalText}
          </h2>
        </div>
      </div>
  )
}

export default ModalContent;