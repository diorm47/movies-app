import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, children }) => {
  return (
    isOpen
      ? createPortal(<div className="modal">{children}</div>, document.body)
      : null
  )
};

export default Modal;
