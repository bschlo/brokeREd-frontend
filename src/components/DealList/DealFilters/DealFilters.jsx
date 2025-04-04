import React, { useState, useRef, useEffect } from "react";
import "./DealFilters.css";
import { MdFilterListAlt } from "react-icons/md";


const DealFilters = ({ filters, handleFilterChange, setDeals}) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  const toggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClearFilters = async () => {
    handleFilterChange({
      target: {
        name: "clear",
        value: "clear",
      },
    });
    setDeals([])
  
    try {
      const sortedDeals = await dealService.index({}, 'date');  
      setDeals(sortedDeals);
    } catch (error) {
      console.error("Error resetting sort:", error);
    }
  };

  return (
    <div className="filter-container" ref={filterRef}>
      <div className="filter-header" onClick={toggleFilters}>
        <MdFilterListAlt size={40} />
      </div>

      {isOpen && (
        <div className="filter-main">
          <div className="filter-group">
            <label className="filter-label" htmlFor="storiesMin">
              Units
            </label>
            <input
              id="unitsMin"
              type="number"
              name="unitsMin"
              placeholder="Min"
              value={filters.unitsMin}
              onChange={handleFilterChange}
              className="filter-input"
            />{" "}
            -
            <input
              id="unitsMax"
              type="number"
              name="unitsMax"
              placeholder="Max"
              value={filters.unitsMax}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="storiesMin">
              Stories
            </label>
            <input
              id="storiesMin"
              type="number"
              name="storiesMin"
              placeholder="Min"
              value={filters.storiesMin}
              onChange={handleFilterChange}
              className="filter-input"
            />{" "}
            -
            <input
              id="storiesMax"
              type="number"
              name="storiesMax"
              placeholder="Max"
              value={filters.storiesMax}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="squareFeetMin">
              Square Feet
            </label>
            <input
              id="squareFeetMin"
              type="number"
              name="squareFeetMin"
              placeholder="Min"
              value={filters.squareFeetMin}
              onChange={handleFilterChange}
              className="filter-input"
            />{" "}
            -
            <input
              id="squareFeetMax"
              type="number"
              name="squareFeetMax"
              placeholder="Max"
              value={filters.squareFeetMax}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="rateMin">
              Spread (Rate)
            </label>
            <input
              id="minimumRate"
              type="number"
              name="minimumRate"
              placeholder="Min"
              value={filters.minimumRate}
              onChange={handleFilterChange}
              className="filter-input"
            />{" "}
            -
            <input
              id="maximumRate"
              type="number"
              name="maximumRate"
              placeholder="Max"
              value={filters.maximumRate}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="loanAmountMin">
              Loan Amount
            </label>
            <input
              id="loanAmountMin"
              type="number"
              name="loanAmountMin"
              placeholder="Min"
              value={filters.loanAmountMin}
              onChange={handleFilterChange}
              className="filter-input"
            />{" "}
            -
            <input
              id="loanAmountMax"
              type="number"
              name="loanAmountMax"
              placeholder="Max"
              value={filters.loanAmountMax}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="dealType">
              Deal Type
            </label>
            <select
              id="dealType"
              name="dealType"
              value={filters.dealType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Select Deal Type</option>
              <option value="Acquisition">Acquisition</option>
              <option value="Condo Inventory">Condo Inventory</option>
              <option value="Construction">Construction</option>
              <option value="Covered Land">Covered Land</option>
              <option value="Office to Condo Conversion">
                Office to Condo Conversion
              </option>
              <option value="Office to Multifamily Conversion">
                Office to Multifamily Conversion
              </option>
              <option value="Refinance">Refinance</option>
              <option value="TCO">TCO</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="assetClass">
              Asset Class
            </label>
            <select
              id="assetClass"
              name="assetClass"
              value={filters.assetClass}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Select Asset Class</option>
              <option value="Condo">Condo</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Industrial">Industrial</option>
              <option value="Land">Land</option>
              <option value="Mixed-Use">Mixed-Use</option>
              <option value="Multifamily">Multifamily</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className="clear-filters-container">
            <button className="clear-filters" onClick={handleClearFilters}>
              Clear Applied Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealFilters;
