import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-black opacity-50 z-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  function preventClose(e) {
    e.stopPropagation();
  }

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses} onClick={onClose}>
        <div
          onClick={preventClose}
          className="relative max-w-xl max-h-[80vh] overflow-auto bg-white  rounded shadow-lg"
        >
          <button
            className="absolute top-4 right-4 rounded-full p-1"
            onClick={onClose}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
