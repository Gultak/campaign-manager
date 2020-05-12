import React, { useContext } from 'react';
import * as items from "../components/characters";
import * as ROLE from "../constants/roles"
import { LanguageContext } from '../constants/contexts';
import { PageContent } from "../components/layout/PageContent";

export function Landing() {
  const language = useContext(LanguageContext);
  const title = language.translate('titleLanding', 'Landing');

  return (<PageContent title={title} items={items} />);
}

const Data = {
  id: 'landing',
  lang: 'landing',
  path: '/landing',
  name: 'Landing',
  menu: true,
  comp: <Landing />,
  role: ROLE.NONE,
  sort: 0
};

export default Data;
