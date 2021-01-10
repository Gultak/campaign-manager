import React from 'react';
import * as ROLE from "../constants/roles"
import { CampaignOverview } from '../components/campaigns/CampaignOverview';
import { CampaignView } from '../components/campaigns/CampaignView';
import { CampaignSheet } from '../components/campaigns/CampaignSheet';
import { Switch, Route } from 'react-router-dom';

export function Campaigns() {
  return (
    <Switch>
      <Route path={`${Data.path}/:uid/sheet`} component={CampaignSheet} />
      <Route path={`${Data.path}/:uid`} component={CampaignView} />
      <Route component={CampaignOverview} />
    </Switch>
  );
}

const Data = {
  id: 'campaigns',
  lang: 'campaigns',
  path: '/campaigns',
  name: 'Campaigns',
  comp: <Campaigns />,
  role: ROLE.GAMEMASTER,
  sort: 20
};

export default Data;