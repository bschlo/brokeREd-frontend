import React, { useState, useEffect, useRef } from "react";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router";
import './DropUpMenu.css'

const DropUpMenu = ({ handleDeleteDeal, deal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { dealId } = useParams();
  const navigate = useNavigate() 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="parent-container">
      <button className="settings-button" onClick={() => setIsOpen(!isOpen)} aria-label="Settings">
        <IoMdSettings size={40}/>
      </button>
      {isOpen && (
        <div className="dropup-menu">
            <button className='edit-deal' onClick={() => navigate(`/deals/${dealId}/edit`)}>
              Edit
            </button>
            <button className='delete-deal' onClick={() => handleDeleteDeal(deal.id)}>
              Delete Deal
            </button>
        </div>
      )}
    </div>
  );
};

export default DropUpMenu;
