import React, { createContext, useContext, useState, ReactNode } from "react";
import { translateText } from "../../shared/lib/yandex-translate-api"; // Ваш метод перевода


type Language = "en" | "ru";


interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const translate = async (text: string) => {
    if (language === "en") return text; 
    try {
      const translatedText = await translateText(text, language);
      return translatedText;
    } catch (error) {
      console.error("Ошибка перевода:", error);
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
