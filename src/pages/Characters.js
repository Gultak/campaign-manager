import React, { useContext } from 'react';
import * as ROLE from "../constants/roles"
import { Header, Grid } from 'semantic-ui-react';
import { LanguageContext } from '../constants/contexts';

export function Characters() {
  const language = useContext(LanguageContext)

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleCharacters', 'Characters')}</Header>
      </Grid.Column>
    </Grid>
  )
}

const Data = {
  id: 'characters',
  lang: 'characters',
  path: '/characters',
  name: 'Characters',
  menu: true,
  comp: <Characters />,
  role: ROLE.APPROVED,
  sort: 10
};

export default Data;