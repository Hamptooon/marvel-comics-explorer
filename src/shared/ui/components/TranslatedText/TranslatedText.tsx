import React from "react";
import { useLanguage } from "../../../../app/contexts/LanguageContext";

const TranslatedText: React.FC<{ text: string }> = ({ text }) => {
  const { translate } = useLanguage();
  const [translatedText, setTranslatedText] = React.useState(text);

  React.useEffect(() => {
    const fetchTranslation = async () => {
      const result = await translate(text);
      setTranslatedText(result);
    };
    fetchTranslation();
  }, [text, translate]);

  return <>{translatedText}</>;
};


export default TranslatedText;
