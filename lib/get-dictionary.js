const dictionaries = {
  es: () => import('../dictionaries/es').then((module) => module.es),
  en: () => import('../dictionaries/en').then((module) => module.en),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.es();
};
