import React, { useState, useEffect } from 'react';
import * as dealService from '../../services/dealService'
import { useParams } from 'react-router';

const DEALTYPES = [
  'Acquisition',
  'Condo Inventory',
  'Construction',
  'Covered Land',
  'Office to Condo Conversion',
  'Office to Multifamily Conversion',
  'Refinance',
  'TCO'
];

const ASSETCLASSES = [
  "Condo", "Hospitality", "Industrial", "Land", "Mixed-Use", 
  "Multifamily", "Office", "Retail"
];

const RATETYPES = [
  'Fixed', 
  'Floating Rate (1-YR Treasury)', 
  'Floating Rate (10-YR Treasury)', 
  'Floating Rate (5-YR Treasury)', 
  'Floating Rate (LIBOR)', 
  'Floating Rate (SOFR)', 
  'Other'
];

const DealForm = ({ handleAddDeal, handleUpdateDeal }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    stories: 1,
    square_feet: 1,
    rate_type: RATETYPES[0],
    minimum_rate: '',
    maximum_rate: '',
    loan_amount: '',
    deal_type: DEALTYPES[0],
    asset_class: ASSETCLASSES[0],
    image_url: '',
    description: '',
    developers: []
  });
  const [developers, setDevelopers] = useState([])
  const { dealId } = useParams()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'developers') {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value)
      setFormData({
        ...formData,
        developers: selectedValues
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a proper format for developers with name field
    const formattedData = {
      ...formData,
      developers: formData.developers.map(developerId => {
        // Find the developer object from your developers state to get the name
        const developer = developers.find(dev => dev.id.toString() === developerId.toString());
        return {
          id: developerId,
          name: developer?.name || '' // Include the name field that backend expects
        };
      })
    };
    
    if (dealId) {
      handleUpdateDeal(dealId, formattedData);
    } else {
      handleAddDeal(formattedData);
    }
  };
  

  useEffect(() => {
    
    const fetchDevelopers = async () => {
      try {
        const data = await dealService.fetchDevelopers();
        setDevelopers(data.developers);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    const fetchDeal = async () => {
      if (dealId) {
        try {
          const dealData = await dealService.show(dealId);
          if (dealData && dealData.deal) {
            setFormData({
              name: dealData.deal.name || '',
              address: dealData.deal.address || '',
              stories: dealData.deal.stories || 1,
              square_feet: dealData.deal.square_feet || 1,
              rate_type: dealData.deal.rate_type || RATETYPES[0],
              minimum_rate: dealData.deal.minimum_rate || '',
              maximum_rate: dealData.deal.maximum_rate || '',
              loan_amount: dealData.deal.loan_amount || '',
              deal_type: dealData.deal.deal_type || DEALTYPES[0],
              asset_class: dealData.deal.asset_class || ASSETCLASSES[0],
              image_url: dealData.deal.image_url || '',
              description: dealData.deal.description || '',
              developers: dealData.deal.developers || [], // Set developers if present
            });
          }
        } catch (error) {
          console.error('Error fetching deal:', error);
        }
      }
    };

    fetchDevelopers();
    if (dealId) fetchDeal();
  }, [dealId]);

  return (
    <div>
      <h2>{dealId ? 'Edit Deal' : 'New Deal'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Deal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Deal Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="developers">Developers:</label>
          <select
            id="developers"
            name="developers"
            value={formData.developers}
            onChange={handleChange}
            multiple
            required
          >
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.name}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="stories">Stories:</label>
          <input
            type="number"
            id="stories"
            name="stories"
            value={formData.stories}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="square_feet">Square Feet:</label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            value={formData.square_feet}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="rate_type">Rate Type:</label>
          <select
            id="rate_type"
            name="rate_type"
            value={formData.rate_type}
            onChange={handleChange}
            required
          >
            {RATETYPES.map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minimum_rate">Minimum Rate:</label>
          <input
            type="number"
            id="minimum_rate"
            name="minimum_rate"
            value={formData.minimum_rate}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="maximum_rate">Maximum Rate:</label>
          <input
            type="number"
            id="maximum_rate"
            name="maximum_rate"
            value={formData.maximum_rate}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="loan_amount">Loan Amount:</label>
          <input
            type="number"
            id="loan_amount"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="deal_type">Deal Type:</label>
          <select
            id="deal_type"
            name="deal_type"
            value={formData.deal_type}
            onChange={handleChange}
            required
          >
            {DEALTYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="asset_class">Asset Class:</label>
          <select
            id="asset_class"
            name="asset_class"
            value={formData.asset_class}
            onChange={handleChange}
            required
          >
            {ASSETCLASSES.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Deal</button>
      </form>
    </div>
  );
};

export default DealForm;
