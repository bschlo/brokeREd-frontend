import React, { useState, useEffect, useRef } from "react";
import { IoMdSettings } from "react-icons/io";
import { Link, useParams } from "react-router";

const DropUpMenu = ({ handleDeleteDeal, deal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { dealId } = useParams();
  console.log("dropup", deal);

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
    <div ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Settings">
        <IoMdSettings />
      </button>
      {isOpen && (
        <div>
            <button onClick={() => navigate(`/deals/${dealId}/edit`)}>
              Edit
            </button>
            <button onClick={() => handleDeleteDeal(deal.id)}>
              Delete Deal
            </button>
        </div>
      )}
    </div>
  );
};

export default DropUpMenu;
