
# Marvel Comics Explorer 🚀

[![React Native](https://img.shields.io/badge/React%20Native-blue?logo=react)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-orange?logo=firebase)](https://firebase.google.com/)
[![FSD Architecture](https://img.shields.io/badge/Architecture-FSD-brightgreen)](https://feature-sliced.design/)

**Marvel Comics Explorer** — это мобильное приложение для поклонников комиксов, предлагающее immersive-опыт взаимодействия с контентом. Здесь вы найдете:

🌟 **Персонажей** и **комиксы** в детализированном представлении  
💖 Систему **избранного** с синхронизацией между устройствами  
🎨 Персонализированные настройки (**темы** и **язык**)  
🔐 Гибкую систему авторизации через **Google** или **Email**  
🌍 Поддержку русского, английского языков через **Yandex Translate API**

<div align="center">
  <img src="readmeScreens/screen5.png" width="200" />
  <img src="readmeScreens/screen1.png" width="200" />
  <img src="readmeScreens/screen3.png" width="200" />
</div>

## 🚀 Особенности

### 🔒 Умная аутентификация
- **Гостевой режим** с ограниченным функционалом
- Регистрация через:
  - 📧 Email + пароль
  - 🔵 Google OAuth 2.0
- Автоматическая синхронизация данных пользователя

### 🎨 Персонализация
- Три режима темы:
  - 🌓 Системная
  - 🌙 Тёмная
  - ☀️ Светлая
- Динамическая смена языка интерфейса (перевод через Yandex API)

### 📚 Контент-менеджмент
- Интерактивная галерея комиксов с:
  - 📖 Постраничным просмотром
  - 🔍 Детализированной информацией
- Каталог персонажей с:
  - 🧬 Характеристиками
  - 🔗 Связанными комиксами

### ⚙️ Технологический стек
| Технология               | Назначение                          |
|--------------------------|-------------------------------------|
| React Native CLI         | Базовый фреймворк                   |
| Firebase Firestore       | Облачная БД и кэширование          |
| React Navigation v6       | Навигация и deep linking           |
| FSD Architecture         | Структура проекта                  |
| Yandex.Translate| Локализация                        |

## 🛠 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/comicverse.git
cd comicverse
```

2. Установите зависимости:
```bash
npm install
# ИЛИ
yarn
```

3. Настройте Firebase:
- Создайте проект в [Firebase Console](https://console.firebase.google.com/)
- Добавьте файл конфигурации `google-services.json` (Android) и `GoogleService-Info.plist` (iOS)

4. Запустите приложение:
```bash
npx react-native run-android
# ИЛИ
npx react-native run-ios
```

## 🏗 Архитектура (FSD)
```
src/
├── app/                  # Инициализация приложения
├── pages/                # Экранные компоненты
├── widgets/              # Переиспользуемые UI блоки
├── features/             # Фичи
└── shared/               # Утилиты, API конфиги, глобальные стили
```

## 🌍 Локализация
Система перевода реализована через Yandex Translate API:
```javascript
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

// Использование: t('welcome_message')
```
## 🎨 Внешний вид приложения

<div align="center">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 30px;">
    
<div style="flex: 1 1 220px; text-align: center;">
    <img src="readmeScreens/screen1.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    <br/>
    <sub style="font-size: 14px; color: #666;">🦸 Экран с персонажами</sub>
   </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen3.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">🖼 Детали персонажа</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen4.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">📚 Каталог с комиксами</sub>
    </div>

<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen5.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">🖼 Детали комикса</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen2.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">⚙️ Настройки темы и языка приложения</sub>
    </div>







<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen6.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">⚙️ Светлая тема</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen8.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">👤 Профиль пользователя</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen9.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">👤 Профиль гостя</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen10.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">👤 Экран регистрации</sub>
    </div>
<div style="flex: 1 1 220px; text-align: center;">
      <img src="readmeScreens/screen7.png" width="200" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
      <br/>
      <sub style="font-size: 14px; color: #666;">📚 Каталог с комиксами (Светлая тема)</sub>
    </div>

  </div>
</div>

## 📄 Лицензия
Этот проект распространяется под лицензией [MIT](LICENSE).

---
<div align="center">
  Сделано с ❤️ для сообщества любителей комиксов | 2023
</div>

---

