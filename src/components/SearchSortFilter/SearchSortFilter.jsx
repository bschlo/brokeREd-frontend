import React, { useState } from "react";

export const SearchSortFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [filterOption, setFilterOption] = useState("");

  const handleChange = () => {
    onchange({ searchTerm, sortOption, filterOption });
  };

  return (
    <div className="search-sort-filter">
        <input
            type="text"
            placeholder="Search Deals..."
            onChange={(e) => {
                setSearchTerm(e.target.value)
                handleChange()
            }}
        />
        <select
            value={sortOption}
            onChange={(e) => {
                setSortOption(e.target.value)
                handleChange()
            }} 
        >
            <option value="name">Sort by Name</option>
            <option value="loan_amount">Sort by Loan Amount</option>
        </select>   
        <select 
            value={filterOption}
            onChange={(e) => {
                setFilterOption(e.target.value)
                handleChange()
            }}
        >
            <option value="">All Categories</option>
            <option value=""></option>
        </select>
    </div>
  ) 
};
