import React, { useContext } from 'react';
import * as items from "../components/characters";
import * as ROLE from "../constants/roles"
import { LanguageContext } from '../constants/contexts';
import { PageContent } from "../components/layout/PageContent";

export function Characters() {
  const language = useContext(LanguageContext);
  const title = language.translate('titleCharacters', 'Characters');

  return (<PageContent title={title} items={items} />);
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