import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/navigation';
import { AuthProvider } from '../features/auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
function App(): React.JSX.Element {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <AuthProvider>
                    <NavigationContainer>
                        <TabNavigator />
                    </NavigationContainer>
                </AuthProvider>
            </ThemeProvider>
        </LanguageProvider>
        
    );
}

export default App;
