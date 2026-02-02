const dictionaries = {
  es: () => import('../dictionaries/es/index').then((module) => module.es),
  en: () => import('../dictionaries/en/index').then((module) => module.en),
};

export const getDictionary = async (locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.es();
};