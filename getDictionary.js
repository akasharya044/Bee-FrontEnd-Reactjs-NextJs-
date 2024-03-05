const dictionaries = {
  en: () => import('./public/dictionaries/en.json').then((r) => r.default),
  hi: () => import('./public/dictionaries/hi.json').then((r) => r.default),
  es: () => import('./public/dictionaries/es.json').then((r) => r.default),
};

export const getDictionary = (lang) => {
  const result = dictionaries[lang]();
  return result;
};
