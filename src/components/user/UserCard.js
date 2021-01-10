import React, { useContext, useState, useEffect } from 'react';
import * as ROLE from "../../constants/roles"
import * as catalog from "../../pages"
import { Card, Label, Rail, Segment, Icon } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../../constants/contexts';
import { useUser } from '../../tools/Hooks';
import { formatDate } from '../../constants/functions';
import { UserAvatar } from './UserAvatar';
import { CardPlaceholder } from '../layout/placeholder/CardPlaceholder';
import { Link } from 'react-router-dom';

export function UserCard(props) {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const { uid } = props;
  const { user, userid } = useUser(uid);
  const [characters, setCharacters] = useState(0);
  const [campaigns, setCampaigns] = useState(0);

  useEffect(() => {
    if (userid) {
      const charCallback = firebase.characters().where('owner', '==', firebase.user(userid)).onSnapshot(snapshot => {
        const characters = snapshot.docs;
        setCharacters(characters.length);
      });
      const campCallback = firebase.campaigns().where('owner', '==', firebase.user(userid)).onSnapshot(snapshot => {
        const campaigns = snapshot.docs;
        setCampaigns(campaigns.length);
      });
      return (() => {
        charCallback();
        campCallback();
      });
    }
  }, [firebase, userid]);

  return user ?
    <Card {...props} username={user.username}>
      <div className='relative'>
        <UserAvatar dummysize={512} uid={uid} />
        {user.roles.includes(ROLE.ADMIN)
          ? (<Rail attached internal position='right'>
            <Segment basic>
              <Label ribbon='right' color='grey'>{language.translate(`role-${ROLE.ADMIN}`, ROLE.ADMIN.toUpperCase())}</Label>
            </Segment>
          </Rail>)
          : null}
        <Rail attached internal position='left'>
          <Segment basic>
            <Label ribbon color='blue' >{user.roles.includes(ROLE.GAMEMASTER)
              ? language.translate(`role-${ROLE.GAMEMASTER}`, ROLE.GAMEMASTER.toUpperCase())
              : language.translate('role-player', 'PLAYER')}</Label>
          </Segment>
        </Rail>
      </div>
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Meta>{language.translate('labelJoined', 'Joined on:')}{' ' + formatDate(user.registeredAt)}</Card.Meta>
        <Card.Description>
          - description coming soon -
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={catalog.Characters.path}><Icon name='user' />{characters} {language.translate('labelCharacters', 'Characters')}</Link>
        {user.roles.includes(ROLE.GAMEMASTER) && <>
          <br />
          <Link to={catalog.Campaigns.path}><Icon name='world' />{campaigns} {language.translate('labelCampaigns', 'Campaigns')}</Link>
        </ >}
      </Card.Content>
    </Card> : <CardPlaceholder />;
}
