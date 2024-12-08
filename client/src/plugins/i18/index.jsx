import en from "./json/en.json";

const translations = {
  en,
};

let currentLanguage = process.env.REACT_APP_LANGUAGE || "en";

export function i18Get(key, lang = currentLanguage) {
  const langTranslations = translations[lang] || {};
  return langTranslations[key] || key;
}

const I18 = ({ tkey }) => {
  const value = i18Get(tkey);
  return <>{value}</>;
};

export default I18;
