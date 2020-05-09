import React, { useContext } from 'react';
import { Segment, Card, Image, Grid } from 'semantic-ui-react';
import { UserContext, LanguageContext } from '../../constants/contexts';

export function Overview() {
  const user = useContext(UserContext)
  const language = useContext(LanguageContext)

  return (
    <Segment textAlign='left' user={user}>
      <Grid columns={3} relaxed='very' stackable>
        <Grid.Row stretched>
          <Grid.Column stretched>
            <Card fluid>
              <Image src={user.user.photoURL || 'https://eu.ui-avatars.com/api/?size=512&bold=true&name=' + user.user.username} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.user.username}</Card.Header>
                <Card.Meta>{language.translate('labelJoined', 'Joined on:')} {'' + user.user.registeredAt.toDate()}</Card.Meta>          <div>TEXT</div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column stretched>
          </Grid.Column>
          <Grid.Column stretched>
            <Card fluid>
              <Image src={user.user.photoURL || 'https://eu.ui-avatars.com/api/?size=512&bold=true&name=' + user.user.username} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.user.username}</Card.Header>
                <Card.Meta>{language.translate('labelJoined', 'Joined on:')} {'' + user.user.registeredAt.toDate()}</Card.Meta>          <div>TEXT</div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment >
  );
}

const Data = {
  id: 'overview',
  lang: 'profile-overview',
  name: 'Overview',
  comp: <Overview />
};

export default Data;
