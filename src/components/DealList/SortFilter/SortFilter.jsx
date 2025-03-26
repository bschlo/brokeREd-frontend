import React, { useState, useEffect, useRef } from 'react';
import * as dealService from '../../../services/dealService';
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericDownAlt } from "react-icons/fa";
import './SortFilter.css'

const SortFilter = ({ filters, setDeals }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const dropdownRef = useRef(null)

  const handleSortChange = async (order) => {
    setSortOrder(order); 
    setDropdownOpen(false);  
    try {
      const sortedDeals = await dealService.index(filters, order); 
      setDeals(sortedDeals);  
    } catch (error) {
      console.error("Error sorting deals:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); 
  };

  const removeSort = async () => {
    setSortOrder('asc');  
    setDropdownOpen(false);  
    try {
      const sortedDeals = await dealService.index(filters, 'date'); 
      setDeals(sortedDeals);
    } catch (error) {
      console.error("Error resetting sort:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);  
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-filter">
      
      <button 
        onClick={toggleDropdown} 
        className="sort-button"
        title="Sort by Loan Amount"
      >
        Sort By
      </button>

      
      {dropdownOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <div 
            onClick={() => handleSortChange('asc')} 
            className="sort-option"
            title="Sort by Loan Amount (Ascending)"
          >
            <div className='icon-down'><FaSortNumericDown size={20} /></div>
            <div className='sort-title'>Sort by Loan Amount (Ascending)</div>
          </div>
          <div 
            onClick={() => handleSortChange('desc')} 
            className="sort-option"
            title="Sort by Loan Amount (Descending)"
          >
            <div className='icon-down'><FaSortNumericDownAlt size={20} /></div>
            <div className='sort-title'>Sort by Loan Amount (Descending)</div>
          </div>

          
          <div onClick={removeSort} className="clear-sort-option" title="Clear Sort">
            Clear Sort
          </div>
        </div>
      )}
    </div>
  );
};

export default SortFilter;
