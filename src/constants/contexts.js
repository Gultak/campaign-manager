import React from 'react';
import { languages } from "../lang/languages";

export const FirebaseContext = React.createContext(null);

export const LanguageContext = React.createContext({
  language: languages.default,
  switchLanguage: (language) => { },
  translate: (key, fallback) => { }
});

export const UserContext = React.createContext({
  authenticated: false,
  roles: []
});
