import React, { useContext, useState } from 'react';
import { Placeholder, Segment, Header, Rail, Grid, Icon, Label } from 'semantic-ui-react';
import { LanguageContext } from '../../constants/contexts';
import { useUser } from '../../tools/Hooks';
import { UserRoles } from './UserRoles';
import { formatDate } from '../../constants/functions';

export function UserDetails({ uid }) {
  const language = useContext(LanguageContext);
  const { user, userid } = useUser(uid);
  const [debugCollapsed, setDebugCollapsed] = useState(true);

  const providericon = user ? ({
    "google.com": 'google',
    "facebook.com": 'facebook',
    "password": 'lock'
  })[user.provider] : false;

  return (<>
    <Segment secondary>
      <Rail attached internal position='right' className="padded overlay">
        <Segment tertiary size='mini' className='no-overflow'>{(process.env.NODE_ENV === "development")
          ? <Label icon={debugCollapsed ? 'plus' : 'minus'} corner='right' size='mini' onClick={() => setDebugCollapsed(!debugCollapsed)} /> : null}
          <pre>ID: {userid}</pre>
        </Segment>
        {(process.env.NODE_ENV === "development")
          ? (<Segment tertiary size='mini' style={{ maxHeight: debugCollapsed ? '2em' : undefined }} className='no-overflow'>
            <pre className="overflow-x">{JSON.stringify(user, null, 2)}</pre>
          </Segment>) : (null)}
      </Rail>
      {user
        ? (<Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">{language.translate('labelUserdata', 'User Data')}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelUsername', 'Username')}</Grid.Column>
            <Grid.Column>{user.username} <Icon name='edit' /></Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelEmail', 'E-mail address')}</Grid.Column>
            <Grid.Column>{user.email}</Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelRoles', 'Roles')}</Grid.Column>
            <Grid.Column><UserRoles roles={user.roles} /></Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelRegistered', 'Registered at')}</Grid.Column>
            <Grid.Column>{formatDate(user.registeredAt, true)}</Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelLastLogin', 'Last login at')}</Grid.Column>
            <Grid.Column>{formatDate(user.lastLogin, true)}</Grid.Column>
          </Grid.Row>
        </Grid>)
        : (<Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>)}
    </Segment>
    <Segment secondary>
      {providericon && <Label icon={providericon} corner='right' size='massive' />}
      {user
        ? (<Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">{language.translate('labelAccountdata', 'Account Data')}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelAvatarUrl', 'Avatar-Url')}</Grid.Column>
            <Grid.Column><span className='text-overflow' style={{ maxWidth: '80%' }}>{user.avatarURL || '<empty>'}</span> <Icon name='edit' /></Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelVerified', 'E-mail verified?')}</Grid.Column>
            <Grid.Column><Icon name={user.verified ? 'toggle on' : 'toggle off'} color={user.verified ? 'green' : 'grey'} /></Grid.Column>
          </Grid.Row>
        </Grid>)
        : (<Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>)}
    </Segment>
  </>
  );
}
