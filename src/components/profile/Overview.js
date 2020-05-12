import React, { useContext } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { UserContext } from '../../constants/contexts';
import { UserCard } from '../user/UserCard';
import { UserDetails } from '../user/UserDetails';

export function Overview() {
  const user = useContext(UserContext);

  return (<>
    <Segment textAlign='left' user={user}>
      <Grid columns={3} relaxed='very' stackable>
        <Grid.Row stretched>
          <Grid.Column stretched>
            <UserCard />
          </Grid.Column>
          <Grid.Column stretched colSpan="2">
            <UserDetails />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment >
  </>);
}

const Data = {
  id: 'overview',
  lang: 'profile-overview',
  name: 'Overview',
  comp: <Overview />,
  sort: 1
};

export default Data;
