// features/auth/AuthContext.tsx
import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseError} from 'firebase/app';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';

type AuthContextType = {
  isAuthenticated: boolean;
  user: FirebaseAuthTypes.User | null;
  signInAsGuest: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderType = {
  children: ReactNode;
};

export const AuthProvider = ({children} :  AuthProviderType) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '456442123973-8e0g1e74hlgehloev1b9dplet9sh7b6b.apps.googleusercontent.com', 
    });
    

    
    const unsubscribe = auth().onAuthStateChanged(currentUser  => {
      console.log('currentUser:', currentUser);
      setUser(currentUser);
      if (!currentUser) {
        signInAsGuest();
      }
    });

    // Вход как гость при запуске приложения, если пользователь не авторизован
    

    return unsubscribe;
  }, [user]);

  const signInAsGuest = async () => {
    await auth().signInAnonymously();
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Некорректный формат электронной почты.');
          case 'auth/user-not-found':
            throw new Error('Пользователь с таким адресом электронной почты не найден.');
          case 'auth/wrong-password':
            throw new Error('Неверный пароль.');
          default:
            throw new Error('Не удалось выполнить вход. Попробуйте снова.');
        }
      } else {
        throw new Error('Произошла ошибка входа. Попробуйте снова.');
      }
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Некорректный формат электронной почты.');
          case 'auth/weak-password':
            throw new Error('Пароль должен содержать не менее 6 символов.');
          case 'auth/email-already-in-use':
            throw new Error('Этот адрес электронной почты уже используется.');
          default:
            throw new Error('Произошла ошибка регистрации. Попробуйте снова.');
        }
      } else {
        throw new Error('Произошла ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
  
      if (!idToken) {
        throw new Error('Ошибка входа. Не удалось получить токен ID.');
      }
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/account-exists-with-different-credential':
            throw new Error('Аккаунт с такой почтой уже зарегистрирован. Попробуйте другой способ входа.');
          case 'auth/popup-closed-by-user':
            throw new Error('Вход был прерван пользователем.');
          default:
            throw new Error('Не удалось выполнить вход через Google. Попробуйте снова.');
        }
      } else {
        throw new Error('Ошибка входа через Google. Попробуйте снова.');
      }
    }
  };
  
  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      throw new Error('Ошибка при выходе из аккаунта. Попробуйте снова.');
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signInAsGuest,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
