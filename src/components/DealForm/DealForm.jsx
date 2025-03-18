import React, { useState, useEffect, useRef } from "react";
import * as dealService from "../../services/dealService";
import { useParams } from "react-router";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

const DEALTYPES = [
  "Acquisition",
  "Condo Inventory",
  "Construction",
  "Covered Land",
  "Office to Condo Conversion",
  "Office to Multifamily Conversion",
  "Refinance",
  "TCO",
];

const ASSETCLASSES = [
  "Condo",
  "Hospitality",
  "Industrial",
  "Land",
  "Mixed-Use",
  "Multifamily",
  "Office",
  "Retail",
];

const RATETYPES = [
  "Fixed",
  "Floating Rate (1-YR Treasury)",
  "Floating Rate (10-YR Treasury)",
  "Floating Rate (5-YR Treasury)",
  "Floating Rate (LIBOR)",
  "Floating Rate (SOFR)",
  "Other",
];

const DealForm = ({ handleAddDeal, handleUpdateDeal }) => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    stories: 1,
    square_feet: 1,
    rate_type: RATETYPES[0],
    minimum_rate: "",
    maximum_rate: "",
    loan_amount: "",
    deal_type: DEALTYPES[0],
    asset_class: ASSETCLASSES[0],
    image_url: "",
    description: "",
    developers: [],
  });
  const [developers, setDevelopers] = useState([]);
  const [coordinates, setCoordinates] = useState(null); // Store lat and lng
  const { dealId } = useParams();

  const autocompleteRef = useRef(null); // Reference for Autocomplete component

  // Handle address change
  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setFormData({
        ...formData,
        address: place.formatted_address,
        latitude: lat,
        longitude: lng,
      });
    } else {
      setFormData({
        ...formData,
        latitude: formData.latitude || coordinates?.lat,
        longitude: formData.longitude || coordinates?.lng,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "developers") {
      const selectedDevelopers = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, developers: selectedDevelopers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dealId) {
      handleUpdateDeal(dealId, formData);
    } else {
      handleAddDeal(formData);
    }
  };

  // Function to geocode the address
  const geocodeAddress = (address) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setCoordinates({ lat, lng });
      } else {
        console.error("Geocode was not successful: " + status);
      }
    });
  };

  useEffect(() => {
    if (formData.address) {
      geocodeAddress(formData.address); // Call geocoding when address changes
    }
  }, [formData.address]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const data = await dealService.fetchDevelopers();
        setDevelopers(data.developers);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    const fetchDeal = async () => {
      if (dealId) {
        try {
          const dealData = await dealService.show(dealId);
          if (dealData && dealData.deal) {
            setFormData({
              name: dealData.deal.name || "",
              address: dealData.deal.address || "",
              latitude: dealData.deal.latitude || "", 
              longitude: dealData.deal.longitude || "",
              stories: dealData.deal.stories || 1,
              square_feet: dealData.deal.square_feet || 1,
              rate_type: dealData.deal.rate_type || RATETYPES[0],
              minimum_rate: dealData.deal.minimum_rate || "",
              maximum_rate: dealData.deal.maximum_rate || "",
              loan_amount: dealData.deal.loan_amount || "",
              deal_type: dealData.deal.deal_type || DEALTYPES[0],
              asset_class: dealData.deal.asset_class || ASSETCLASSES[0],
              image_url: dealData.deal.image_url || "",
              description: dealData.deal.description || "",
              developers: dealData.deal.developers.map(dev => dev.id) || [],
            });
          }
        } catch (error) {
          console.error("Error fetching deal:", error);
        }
      }
    };

    fetchDevelopers();
    if (dealId) fetchDeal();
  }, [dealId]);

  const libraries = ['places']

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
    <div>
      <h2>{dealId ? "Edit Deal" : "New Deal"}</h2>
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

         {/* Google Maps Address Autocomplete */}
         <div>
          <label htmlFor="address">Deal Address:</label>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Enter address"
              required
            />
          </Autocomplete>
        </div>

        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            readOnly
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
    </LoadScript>
  );
};

export default DealForm;
