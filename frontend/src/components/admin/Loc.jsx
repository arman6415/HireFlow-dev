import React, { useState } from 'react';

const Loc = ({ isOpen, onClose, onLocationSelect }) => {
  const [location, setLocation] = useState('');

  const handleSearchChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSelect = () => {
    onLocationSelect(location);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Select Location</h2>
          <div className="form-group">
            <label htmlFor="location-input">Location:</label>
            <input
              id="location-input"
              type="text"
              value={location}
              onChange={handleSearchChange}
              placeholder="Search location"
              className="input"
            />
          </div>
          <div className="modal-footer">
            <button onClick={handleLocationSelect} className="btn">
              Select Location
            </button>
            <button onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Loc;
