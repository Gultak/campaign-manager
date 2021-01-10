import React, { useContext } from 'react';
import * as items from "../components/profile";
import * as ROLE from "../constants/roles";
import { LanguageContext } from '../constants/contexts';
import { PageContent } from "../components/layout/PageContent";

export function Profile() {
  const language = useContext(LanguageContext);
  const title = language.translate('titleProfile', 'Profile');

  return (<PageContent title={title} items={items} />);
}

const Data = {
  id: 'profile',
  lang: 'profile',
  path: '/profile',
  name: 'Profile',
  comp: <Profile />,
  role: ROLE.APPROVED,
  sort: 100
};

export default Data;
