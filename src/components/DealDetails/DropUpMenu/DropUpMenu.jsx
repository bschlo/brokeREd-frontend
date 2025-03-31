import React, { useState, useEffect, useRef } from "react";
import { IoMdSettings } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import './DropUpMenu.css';

const DropUpMenu = ({ handleDeleteDeal, deal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State to toggle the warning modal
  const menuRef = useRef(null);
  const { dealId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setShowWarning(true); // Show the warning modal when delete is clicked
  };

  const handleCancel = () => {
    setShowWarning(false); // Close the warning modal if cancel is clicked
  };

  const handleConfirmDelete = () => {
    handleDeleteDeal(deal.id); // Call the delete function
    setShowWarning(false); // Close the warning modal
  };

  return (
    <div ref={menuRef} className="parent-container">
      <button className="settings-button" onClick={() => setIsOpen(!isOpen)} aria-label="Settings">
        <IoMdSettings size={40} />
      </button>
      <div className={`dropup-menu ${isOpen ? 'show' : ''}`}>
        <button className="edit-deal" onClick={() => navigate(`/deals/${dealId}/edit`)}>
          Edit
        </button>
        <button className="delete-deal" onClick={handleDeleteClick}>
          Delete Deal
        </button>
      </div>

      {showWarning && (
        <div className="overlay">
          <div className="warning-modal">
            <div className="message">
              Are you sure you want to delete this deal?
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropUpMenu;
