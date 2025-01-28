import React, { useEffect, useRef, useState } from "react";

const LocationInput = ({ formData, setFormData }) => {
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          resolve();
          return;
        }

        window.initGoogleMaps = () => {
          resolve();
        };

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9_d-XNve_5my1KTvIMK0bfK1rSUQnpc&libraries=places&callback=initGoogleMaps&loading=async`;
        script.async = true;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeAutocomplete = () => {
      if (!window.google || !inputRef.current) return;

      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"], // Adjust types as needed
          componentRestrictions: { country: "US" }, // Restrict to the US
          fields: ["formatted_address", "geometry", "name"], // Specify fields
        }
      );

      autoCompleteRef.current.addListener("place_changed", handlePlaceSelect);
      setIsLoaded(true);
    };

    const initialize = async () => {
      try {
        await loadGoogleMapsScript();
        initializeAutocomplete();
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initialize();

    return () => {
      if (window.initGoogleMaps) delete window.initGoogleMaps;
      const script = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      );
      if (script) script.remove();

      if (autoCompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autoCompleteRef.current
        );
      }
    };
  }, []);

  const handlePlaceSelect = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place.geometry) {
      console.log("No location data available");
      return;
    }

    const locationData = {
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    setFormData((prevData) => ({
      ...prevData,
      location: locationData.address,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <input
      ref={inputRef}
      name="location"
      value={formData.location || ""}
      onChange={handleLocationChange}
      type="text"
      placeholder="Search for a location..."
      disabled={!isLoaded}
    />
  );
};

export default LocationInput;
