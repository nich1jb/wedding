import { useEffect, useRef, useState } from 'react';
import { TextBox } from './common';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
  );
  autoComplete.setFields(['address_components', 'formatted_address']);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery)
  );
};

const handlePlaceSelect = async updateQuery => {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
};

const SearchLocationInput = ({ manualInput }) => {
  const [manualAddress, setManualAddress] = useState(null);
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    setManualAddress(manualInput);
  }, [manualInput]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handleChange = event => {
    setManualAddress(null);
    setQuery(event.target.value);
  };

  return (
    <TextBox
      ref={autoCompleteRef}
      autoComplete="off"
      name="address"
      id="address"
      onChange={handleChange}
      placeholder="Enter a City"
      value={manualAddress ? manualAddress : query}
    />
  );
};

export default SearchLocationInput;
