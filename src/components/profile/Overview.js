import React from 'react';
import { UserOverview } from '../user/UserOverview';

export function Overview() {
  return <UserOverview />;
}

const Data = {
  id: 'overview',
  lang: 'profile-overview',
  name: 'Overview',
  comp: <Overview />,
  sort: 1
};

export default Data;
