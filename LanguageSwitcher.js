'use client';
import React, { useContext, useEffect, useState } from 'react';
import { getDictionary } from './getDictionary'; // Import the getDictionary function
import { ParamsContext } from './app/[lang]/ParamContext'; // Adjust the import path as needed
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { lang, setLang } = useContext(ParamsContext);
  const [isLoading, setIsLoading] = useState(true);

  const languages = ['en', 'hi', 'es']; // List of available languages
  const currentLangIndex = languages.indexOf(lang); // Get the current index of the language

  const cycleLanguage = async () => {
    // Calculate the next language index
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    const nextLang = languages[nextLangIndex];

    setIsLoading(true);

    // Fetch the dictionary for the selected language
    const langData = await getDictionary(nextLang);

    // Update the language in the context
    setLang(nextLang);

    // Save the selected language preference in local storage
    localStorage.setItem('preferredLanguage', nextLang);

    setIsLoading(false);
  };

  // Effect to initialize the language from local storage
  useEffect(() => {
    const preferredLanguage =
      localStorage.getItem('preferredLanguage') || languages[0];
    setLang(preferredLanguage);
  }, [setLang]);

  // Effect to fetch dictionary whenever language changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getDictionary(lang);
      setIsLoading(false);
    };

    fetchData();
  }, [lang]);

  if (isLoading) {
    // Render a loading state if needed
    return <div>Loading...</div>;
  }

  return (
    <IconButton onClick={cycleLanguage} color="inherit">
      <LanguageIcon />
    </IconButton>
  );
};

export default LanguageSwitcher;
