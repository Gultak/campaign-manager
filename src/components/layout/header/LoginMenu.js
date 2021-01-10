import React, { useContext, useState } from 'react';
import * as catalog from "../../../pages"
import { Popup, Menu, Divider, Input, Icon } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../../../constants/contexts';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../tools/Hooks';


export function LoginMenu({ menu }) {
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);

  const { data, handleInputChange, handleSubmit } = useForm(signin);

  function signin() {
    firebase.doLoginUser(data.email, data.password).then(() => {
      setLoginError(null);
      history.push(catalog.Home.path);
    }).catch(error => setLoginError(error?.message));
  }

  function handleKeyPress(event) {
    event && event.key === 'Enter' && signin();
  }

  return (<Popup key="loggedout" trigger={<Menu.Item position='right'><Icon name='user outline' size='large' className='login-menu' /></Menu.Item>}
    icon={null} pinned position='bottom right' on='click' offset={-18}>
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
      </Menu></Popup.Content>
  </Popup>);
}