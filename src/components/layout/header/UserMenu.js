import React, { useContext, useState } from 'react';
import * as catalog from "../../../pages"
import { Popup, Menu, Divider } from 'semantic-ui-react';
import { LanguageContext, UserContext, FirebaseContext } from '../../../constants/contexts';
import { useHistory, useLocation } from 'react-router-dom';
import { UserAvatar } from '../../user/UserAvatar';


export function UserMenu({ menu }) {
  const [logoutError, setLogoutError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  function signout() {
    firebase.doSignOut().then(() => {
      setLogoutError(null);
      history.push(catalog.Landing.path);
    }).catch(error => setLogoutError(error?.message));
  }

  return (<Menu.Item as='a' position='right'><strong>{user?.user?.username}</strong>
    <Popup key="loggedin"
      trigger={
        <UserAvatar uid={user.uid} avatar className='user-menu' />
      } icon={null} pinned position='bottom right' on='click' offset={5}>
      <Popup.Content>
        <Menu text vertical>
          {menu.map(item => <Menu.Item key={item.id} icon={item.icon} onClick={() => history.push(item.path)}
            active={item.path === location.pathname}>{language.translate(item.lang, item.name)}</Menu.Item>)}
          <Divider fitted />
          <Popup key={logoutError} position='left center' open={logoutError} trigger={
            <Menu.Item icon='sign-out' content={language.translate('menuLogout', 'Logout')} onClick={signout} />}>
            <Popup.Header>Error</Popup.Header>
            <Popup.Content>{logoutError}</Popup.Content>
          </Popup>
        </Menu>
      </Popup.Content>
    </Popup>
  </Menu.Item>);
}