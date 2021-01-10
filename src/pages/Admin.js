import React, { useContext } from 'react';
import * as Items from "../components/admin"
import * as ROLE from "../constants/roles";
import { LanguageContext } from '../constants/contexts';
import { Grid, Header, Tab } from 'semantic-ui-react';

export function Admin() {
  const language = useContext(LanguageContext);

  const panes = Object.values(Items).map(item => {
    return {
      menuItem: language.translate(item.lang, item.name),
      render: () => <Tab.Pane content={item.comp} />
    };
  });

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleAdmin', 'Admin')}</Header>
        <Tab panes={panes} />
      </Grid.Column>
    </Grid >
  );
}

const Data = {
  id: 'admin',
  lang: 'admin',
  path: '/admin',
  name: 'Admin',
  comp: <Admin />,
  role: ROLE.ADMIN,
  sort: 999
};

export default Data;
