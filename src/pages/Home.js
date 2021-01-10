import React, { useContext } from 'react';
import * as items from "../components/home";
import * as ROLE from "../constants/roles"
import { LanguageContext } from '../constants/contexts';
import { PageContent } from "../components/layout/PageContent";

export function Home() {
  const language = useContext(LanguageContext);
  const title = language.translate('titleHome', 'Home');

  return (<PageContent title={title} items={items} />);
}

const Data = {
  id: 'home',
  lang: 'home',
  path: '/home',
  name: 'Home',
  comp: <Home />,
  role: ROLE.REGISTERED,
  sort: 1
};

export default Data;
