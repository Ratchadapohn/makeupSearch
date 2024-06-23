import React from "react";

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const LargeImageModal: React.FC<Props> = ({ imageUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={imageUrl} alt="Large Makeup" />
      </div>
    </div>
  );
};

export default LargeImageModal;
