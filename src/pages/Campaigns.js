import React, { useContext } from 'react';
import * as items from "../components/characters";
import * as ROLE from "../constants/roles"
import { LanguageContext } from '../constants/contexts';
import { PageContent } from "../components/layout/PageContent";

export function Campaigns() {
  const language = useContext(LanguageContext);
  const title = language.translate('titleCampaigns', 'Campaigns');

  return (<PageContent title={title} items={items} />);
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