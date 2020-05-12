import React, { useContext, useState } from 'react';
import * as catalog from "../../../pages"
import { Popup, Menu, Divider, Input, Icon } from 'semantic-ui-react';
import { LanguageContext, UserContext, FirebaseContext } from '../../../constants/contexts';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm, useTimer } from '../../../tools/Hooks';

export function LoginMenu({ menu }) {
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const timerElapsed = useTimer(2000);

  const { data, handleInputChange, handleSubmit } = useForm(signin);

  const openLogin = timerElapsed && !user?.authenticated && location?.pathname !== catalog.SignUp.path;

  function signin() {
    firebase.doLoginUser(data.email, data.password).then(() => {
      setLoginError(null);
      history.push(catalog.Home.path);
    }).catch(error => setLoginError(error?.message));
  }

  function handleKeyPress(event) {
    event && event.key === 'Enter' && signin();
  }

  return (<Popup key="loggedout" trigger={<Menu.Item position='right'><Icon name='user outline' size='large'
    style={{ marginTop: '-0.2em', marginBottom: '-0.2em' }} /></Menu.Item>} icon={null} pinned
    position='bottom right' open={openLogin || undefined} on='click' offset={-18}>
    <Popup.Content>
      <Menu compact text vertical>
        <Divider content={language.translate('menuLogin', 'Login')} horizontal />
        <Input icon='user' fluid iconPosition='left' name='email' value={data.username} onChange={handleInputChange}
          placeholder={language.translate('labelEmail', 'E-mail address')} onKeyPress={handleKeyPress} />
        <p />
        <Input icon='key' fluid iconPosition='left' name='password' type='password' value={data.password} onChange={handleInputChange}
          placeholder={language.translate('labelPassword', 'Password')} onKeyPress={handleKeyPress} />
        <Popup key={loginError} position='left center' open={loginError} trigger={
          <Menu.Item icon='sign-in' content={language.translate('menuSignIn', 'Sign in')} onClick={handleSubmit} />}>
          <Popup.Header>Error</Popup.Header>
          <Popup.Content>{loginError}</Popup.Content>
        </Popup>
        <Divider fitted />
        <Menu.Item icon='google' content={language.translate('menuGoogle', 'Sign In with Google')} />
        <Menu.Item icon='facebook' content={language.translate('menuFacebook', 'Sign In with Facebook')} />
        <Divider fitted />
        <Menu.Item icon='user plus' content={language.translate('menuCreateAccount', 'Create Account')} onClick={() => history.push(catalog.SignUp.path)} />
      </Menu></Popup.Content>
  </Popup>);
}