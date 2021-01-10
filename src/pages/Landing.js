import React, { useContext } from 'react';
import * as ROLE from "../constants/roles"
import * as catalog from "../pages"
import { Segment, Header } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../constants/contexts';
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export function Landing() {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);

  return (<Segment secondary textAlign='center'>
    <Header as='h2'>{language.translate('titleLogin', 'Please Sign in')}</Header>
    <FirebaseAuth uiConfig={{ ...firebase.uiConfig(), signInSuccessUrl: catalog.Home.path }} firebaseAuth={firebase.auth} />
  </Segment>
  );
}

const Data = {
  id: 'landing',
  lang: 'landing',
  path: '/landing',
  name: 'Landing',
  comp: <Landing />,
  role: ROLE.NONE,
  sort: 0
};

export default Data;
