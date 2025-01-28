import axios from 'axios';


const FOLDER_ID = "";
const IAM_TOKEN = ""; // Укажите ваш IAM-токен
const TRANSLATE_API_URL = "https://translate.api.cloud.yandex.net/translate/v2/translate";


export const translateText = async (text : string, targetLanguage : string) => {
  try {
    const response = await axios.post(
      TRANSLATE_API_URL,
      {
        folder_id: FOLDER_ID,
        texts: [text],
        targetLanguageCode: targetLanguage,
      },
      {
        headers: {
          Authorization: `Bearer ${IAM_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const translatedText = response.data.translations[0].text;
    return translatedText;
  } catch (error) {
    console.error("Ошибка перевода:", error);
    throw error;
  }
};


