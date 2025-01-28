// import { createContext, useContext, useState, ReactNode } from "react";
// import { useColorScheme } from "react-native";

// export enum ThemeTitle {
//     dark = "dark",
//     light = "light",
// }

// export type Theme = {
//     mode: ThemeTitle;
//     system: boolean;
// };

// // Define the shape of the ThemeContext
// type ThemeContextType = {
//     theme: Theme;
//     setTheme: (theme: Theme) => void;
//     updateTheme: (newTheme?: Theme) => void; // Добавляем updateTheme
// };

// // Create the ThemeContext with default values
// const ThemeContext = createContext<ThemeContextType>({
//     theme: { mode: ThemeTitle.dark, system: false },
//     setTheme: () => {},
//     updateTheme: () => {}, // Заглушка для updateTheme
// });

// // Custom hook for consuming the theme context
// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };

// // Define the props type for ThemeProvider
// type ThemeProviderType = {
//     children: ReactNode;
// };

// // ThemeProvider component to wrap your application or components with theme context
// export const ThemeProvider = ({ children }: ThemeProviderType) => {
//     const [theme, setTheme] = useState<Theme>({ mode: ThemeTitle.dark , system: false});
//     const colorScheme = useColorScheme();
//     // Функция для обновления темы
//     const updateTheme = (newTheme?: Theme) => {
        
//         if (!newTheme) {
//             const newMode =
//                 theme.mode === ThemeTitle.light ? ThemeTitle.dark : ThemeTitle.light;
//             newTheme = { mode: newMode , system: theme.system};
//         } else{
//             if(newTheme.system){
//                 newTheme.mode = colorScheme === 'light' ? ThemeTitle.light : ThemeTitle.dark;
//             }
//         }
//         setTheme(newTheme);
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };



import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum ThemeTitle {
    dark = "dark",
    light = "light",
}

export type Theme = {
    mode: ThemeTitle;
    system: boolean;
};

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    updateTheme: (newTheme?: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: { mode: ThemeTitle.dark, system: false },
    setTheme: () => {},
    updateTheme: () => {},
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

type ThemeProviderType = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderType) => {
    const [theme, setTheme] = useState<Theme>({ mode: ThemeTitle.dark, system: false });
    const colorScheme = useColorScheme();
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem("theme");
                if (savedTheme) {
                    setTheme(JSON.parse(savedTheme));
                }
            } catch (error) {
                console.error("Failed to load theme from storage", error);
            }
        };
        loadTheme();
    }, []);

    const updateTheme = async (newTheme?: Theme) => {
        if (!newTheme) {
            const newMode =
                theme.mode === ThemeTitle.light ? ThemeTitle.dark : ThemeTitle.light;
            newTheme = { mode: newMode , system: theme.system};
        } else{
            
            if(newTheme.system){
                newTheme.mode = colorScheme === 'light' ? ThemeTitle.light : ThemeTitle.dark;
            }
        }
        setTheme(newTheme);

        try {
            console.log("Saving theme to storage", newTheme);
            await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
        } catch (error) {
            console.log("not Saving theme to storage", newTheme);
            console.error("Failed to save theme to storage", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
