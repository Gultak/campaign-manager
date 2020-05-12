import React, { useContext, useEffect, useState } from 'react';
import { Card, Placeholder } from 'semantic-ui-react';
import { UserContext, LanguageContext, FirebaseContext } from '../../constants/contexts';
import { UserAvatar } from './UserAvatar';

export function UserDetails({ uid }) {
  const [user, setUser] = useState(null);

  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (uid) {
      firebase.user(uid).get().then(userData => setUser(userData.data())).catch((error) => alert("Error loading user data:" + error));
    } else {
      setUser(loggedInUser);
    }
  }, [firebase, loggedInUser, uid]);

  return (<Card fluid>{user
    ? (<>
      <UserAvatar size={512} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.user.username}</Card.Header>
        <Card.Meta>{language.translate('labelJoined', 'Joined on:')} {'' + user.user.registeredAt.toDate()}</Card.Meta>          <div>TEXT</div>
      </Card.Content>
    </>)
    : (<>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
      <Placeholder style={{ margin: "1em" }}>
        <Placeholder.Header>
          <Placeholder.Line length="short" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </>)}
  </Card >);
}
