import React from 'react';
import * as ROLE from "../constants/roles"

export const Landing = () => (
  <div>
    <h1>Landing</h1>
  </div>
);

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
