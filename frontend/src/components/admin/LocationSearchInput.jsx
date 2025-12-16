// LocationSearchInput.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
// import { Input, Label } from '@/components/ui'; // Assuming you have these components

const LocationSearchInput = ({ value, onChange }) => {
    const inputRef = useRef(null); // Ref for the input field

    useEffect(() => {
        if (window.google && window.google.maps) {
            const options = {
                types: ['(cities)', 'geocode'], // Suggest cities and geocoded places
            };
            // Initialize the autocomplete object
            const autoComplete = new window.google.maps.places.Autocomplete(inputRef.current, options);

            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();
                if (place && place.formatted_address) {
                    onChange(place.formatted_address); // Set the selected location
                }
            });
        }
    }, []);

    return (
        <div className="space-y-2">
            <label htmlFor="location">Location</label>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    id="location"
                    name="location"
                    value={value}
                    ref={inputRef}
                    onChange={(e) => onChange(e.target.value)} // Handle input change
                    className="pl-10 border border-gray-300 focus:border-gray-500"
                    placeholder="Search for a location"
                />
            </div>
        </div>
    );
};

export default LocationSearchInput;
