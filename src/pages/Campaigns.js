import React, { useContext } from 'react';
import * as ROLE from "../constants/roles"
import { Header, Grid } from 'semantic-ui-react';
import { LanguageContext } from '../constants/contexts';

export function Campaigns() {
  const language = useContext(LanguageContext)

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleCampaigns', 'Campaigns')}</Header>
      </Grid.Column>
    </Grid>
  )
}

const Data = {
  id: 'campaigns',
  lang: 'campaigns',
  path: '/campaigns',
  name: 'Campaigns',
  menu: true,
  comp: <Campaigns />,
  role: ROLE.GAMEMASTER,
  sort: 20
};

export default Data;