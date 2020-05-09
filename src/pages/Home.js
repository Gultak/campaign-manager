import React, { useContext } from 'react';
import * as ROLE from "../constants/roles"
import { Header, Grid } from 'semantic-ui-react';
import { LanguageContext } from '../constants/contexts';

export function Home() {
  const language = useContext(LanguageContext)

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleHome', 'Home')}</Header>
      </Grid.Column>
    </Grid>
  )
}

const Data = {
  id: 'home',
  lang: 'home',
  path: '/home',
  name: 'Home',
  menu: true,
  comp: <Home />,
  role: ROLE.REGISTERED,
  sort: 1
};

export default Data;