import React, { useContext, useEffect, useState } from 'react';
import { Card, Image, Placeholder } from 'semantic-ui-react';
import { UserContext, LanguageContext, FirebaseContext } from '../../constants/contexts';

export function UserCard({ uid }) {
  const [user, setUser] = useState(null);

  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (uid) {
      firebase.user(uid).get().then(userData => setUser(userData.data())).catch((error) => alert("Error loading user data:" + error));
    } else {
      setUser(loggedInUser.user);
    }
  }, [firebase, loggedInUser, uid]);

  return (<Card fluid>{user
    ? (<>
      <Image src={user.photoURL || 'https://eu.ui-avatars.com/api/?size=512&bold=true&name=' + user.username} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Meta>{language.translate('labelJoined', 'Joined on:')} {'' + (user.registeredAt ? user.registeredAt.toDate() : language.translate('unknown', 'unknown'))}</Card.Meta>
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
