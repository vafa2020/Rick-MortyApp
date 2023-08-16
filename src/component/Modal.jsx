import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

export const Modal = ({ title, children, setOpenModal }) => {
  return (
    <div>
      <div className="backdrop" onClick={() => setOpenModal(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <XCircleIcon
            className="icon close"
            onClick={() => setOpenModal(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
