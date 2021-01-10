import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { UserCard } from '../user/UserCard';
import { UserDetails } from '../user/UserDetails';

export function UserOverview({ uid }) {
  return (<>
    <Segment textAlign='left'>
      <Grid columns='equal' relaxed='very' stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <UserCard uid={uid} />
          </Grid.Column>
          <Grid.Column>
            <UserDetails uid={uid} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment >
  </>);
}
