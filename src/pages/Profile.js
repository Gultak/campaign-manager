import React, { useContext } from 'react';
import * as Items from "../components/profile"
import * as ROLE from "../constants/roles"
import { LanguageContext } from '../constants/contexts';
import { Grid, Header } from 'semantic-ui-react';


export function Profile() {
  const language = useContext(LanguageContext)

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleProfile', 'Profile')}</Header>
        {Object.values(Items).map(item => <React.Fragment key={item.id}>{item.comp}</React.Fragment>)}
      </Grid.Column>
    </Grid>
  )
}

const Data = {
  id: 'profile',
  lang: 'profile',
  path: '/profile',
  name: 'Profile',
  menu: true,
  comp: <Profile />,
  role: ROLE.APPROVED,
  sort: 100
};

export default Data;
