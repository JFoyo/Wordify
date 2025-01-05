import React from "react";
import "../CSS/GenTxtCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function GenTxtCard({ text, onCopy }) {
  return (
    <div className="card mt-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <p className="m-0 header">Generated Text</p>
        <button
          type="button"
          className="btn"
          onClick={onCopy}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div className="card-body">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default GenTxtCard;