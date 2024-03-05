import React, { useState, useEffect } from 'react';

const AutoCompleteTextField = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputText.length >= 3) {
      setIsLoading(true);
      fetchSuggestions(inputText);
    } else {
      setSuggestions([]);
    }
  }, [inputText]);

  const fetchSuggestions = async (text: string) => {
    try {
      const response = await fetch(
        `https://Satyam add API url here/suggestions?query=${text}`
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        console.error('API response error');
      }
    } catch (error) {
      console.error('Fetching suggestions failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Satyam"
      />
      {isLoading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteTextField;
