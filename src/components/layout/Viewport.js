import React, { useState, useEffect, useContext } from 'react';
import * as ROLE from "../../constants/roles";
import { LanguageContext, UserContext, FirebaseContext } from '../../constants/contexts'
import { languages } from "../../lang/languages";

import { ContentHeader } from '../layout/ContentHeader'
import { MainContent } from '../layout/MainContent'
import { ContentFooter } from '../layout/ContentFooter'

const EMPTY_USER = {
  authUser: null,
  user: {
    roles: [ROLE.NONE]
  },
  authenticated: false
}

function Viewport() {
  const [language, setLanguage] = useState({
    language: languages.default,
    switchLanguage: switchLanguage,
    translate: translate
  });

  function switchLanguage(newLanguage) {
    setLanguage({ ...language, language: newLanguage });
  }

  function translate(key, fallback) {
    return fallback || '';
  }

  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState(EMPTY_USER);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((firebaseUser) => {
      setFirebaseUser(firebaseUser);
    });
  }, [firebase, firebase.auth])

  useEffect(() => {
    const user = firebaseUser && firebase.user(firebaseUser.uid);
    if (user) {
      user.get().then((userData) => {
        const data = {
          ...{
            username: firebaseUser.displayName || firebaseUser.email,
            email: firebaseUser.email,
            avatarURL: firebaseUser.photoURL,
            phone: firebaseUser.phoneNumber,
            verified: firebaseUser.emailVerified,
            provider: firebaseUser.providerData[0].providerId,
            roles: [ROLE.REGISTERED],
            registeredAt: firebase.timestamp(),
          },
          ...(userData.exists ? userData.data() : {}),
          ...{
            lastLogin: firebase.timestamp(),
            verified: firebaseUser.emailVerified
          }
        };
        const callback = user.onSnapshot(snap => {
          const data = snap.data();
          setUser({
            authUser: firebaseUser,
            authenticated: true,
            uid: firebaseUser.uid,
            user: data
          });
        });
        user.set(data);
        return callback;
      }).catch((error) => alert("Error loading user data:" + error));
    } else {
      setUser(EMPTY_USER);
    }
  }, [firebase, firebaseUser]);

  return (
    <UserContext.Provider value={user}>
      <LanguageContext.Provider value={language}>
        <ContentHeader user={user} />
        <MainContent />
        <ContentFooter />
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default Viewport;
