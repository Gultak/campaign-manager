import React from 'react';
import { Segment } from 'semantic-ui-react';

export function Summary() {

  return (
    <Segment placeholder>

    </Segment>
  );
}

const Data = {
  id: 'summary',
  lang: 'profile-summary',
  name: 'Summary',
  comp: <Summary />,
  sort: 10
};

export default Data;
