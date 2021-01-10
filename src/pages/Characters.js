import React from 'react';
import * as ROLE from "../constants/roles"
import { CharacterOverview } from '../components/characters/CharacterOverview';
import { CharacterView } from '../components/characters/CharacterView';
import { Route, Switch } from 'react-router-dom';
import { CharacterSheet } from '../components/characters/CharacterSheet';

export function Characters() {
  return (
    <Switch>
      <Route path={`${Data.path}/:uid/sheet`} component={CharacterSheet} />
      <Route path={`${Data.path}/:uid`} component={CharacterView} />
      <Route component={CharacterOverview} />
    </Switch>
  );
}

const Data = {
  id: 'characters',
  lang: 'characters',
  path: '/characters',
  name: 'Characters',
  comp: <Characters />,
  role: ROLE.APPROVED,
  sort: 10
};

export default Data;