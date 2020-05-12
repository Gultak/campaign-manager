import React from 'react';
import { Segment } from 'semantic-ui-react';

export function Dummy() {

  return (
    <Segment placeholder>

    </Segment>
  );
}

const Data = {
  id: 'dummy',
  lang: 'profile-dummy',
  name: 'Dummy',
  comp: <Dummy />,
  sort: 10
};

export default Data;
