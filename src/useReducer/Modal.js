import React, { useEffect } from "react";

const Modal = ({ modalMessage, closeModal }) => {
  useEffect(() => {
    setTimeout(closeModal, 2000);
  });
  return <div className="action-message">{modalMessage}</div>;
};

export default Modal;
