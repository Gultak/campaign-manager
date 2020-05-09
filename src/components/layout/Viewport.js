import React, { useState, useEffect, useContext } from 'react';
import * as ROLE from "../../constants/roles";
import { LanguageContext, UserContext, FirebaseContext } from '../../constants/contexts'
import { languages } from "../../lang/languages";

import PageHeader from '../layout/PageHeader'
import MainContent from '../layout/MainContent'
import PageFooter from '../layout/PageFooter'

const EMPTY_USER = {
  authUser: null,
  auser: null,
  authenticated: false,
  roles: [ROLE.NONE]
}

function Viewport() {

  const [language, setLanguage] = useState({
    language: languages.default,
    switchLanguage: switchLanguage,
    translate: translate
  });

  function switchLanguage(newLanguage) {
    setLanguage({ ...language, language: newLanguage })
  }

  function translate(key, fallback) {
    return fallback || '';
  }

  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState(EMPTY_USER);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        firebase.user(authUser.uid).get().then((userData) => {
          const data = {
            ...{
              username: authUser.displayName || authUser.email,
              email: authUser.email,
              photoURL: authUser.photoURL,
              avatar: null,
              roles: [ROLE.REGISTERED],
              registeredAt: firebase.timestamp()
            },
            ...(userData.exists ? userData.data() : {}),
            ...{
              lastLogin: firebase.timestamp()
            }
          };
          setUser({
            authUser: authUser,
            authenticated: true,
            verified: authUser.emailVerified,
            phone: authUser.phoneNumber,
            uid: authUser.uid,
            user: data,
            roles: data.roles
          });
          firebase.user(authUser.uid).set(data);
        }).catch((error) => alert("Error loading user data:" + error))
      } else {
        setUser(EMPTY_USER);
      }
    })
  }, [firebase, firebase.auth])

  return (
    <UserContext.Provider value={user}>
      <LanguageContext.Provider value={language}>
        <PageHeader user={user} />
        <MainContent />
        <PageFooter />
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default Viewport;
