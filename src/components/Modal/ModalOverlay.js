import { createPortal } from "react-dom";
import "./ModalOverlay.css";

const ModalOverlay = ({ isModalOpened, content }) => {
  return isModalOpened
    ? createPortal(
        <div className="modal_wrapper">{content}</div>,
        document.body
      )
    : null;
};

export default ModalOverlay;
