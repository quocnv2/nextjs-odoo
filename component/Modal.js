import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = ({ title, icon, message, status, onClose }) => {
  const modalClass =
    status === "success"
      ? "modal-success"
      : status === "error"
      ? "modal-error"
      : "modal-default";

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className={`modal-content ${modalClass}`}>
          <div className="modal-header">
            <h5 className="modal-title">
              <i className={`icon ${icon}`} style={{ marginRight: "10px" }}></i>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
