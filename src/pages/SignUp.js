import React, { useContext, useState } from 'react';
import * as ROLE from "../constants/roles"
import * as catalog from "../pages"
import { Segment, Grid, Divider, Header, Icon, Button, Form, Popup } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../constants/contexts';
import { useForm } from '../tools/Hooks';
import { useHistory } from 'react-router-dom';

export function SignUp() {
  const history = useHistory();
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const { data, handleInputChange, handleSubmit } = useForm(signup);

  const userError = !(data?.username || '').trim() && language.translate('errorUsername', 'Please enter a valid user name!');
  const emailError = !(data?.email || '').includes('@') && language.translate('errorEmailAddress', 'Please enter a valid E-mail address!');
  const password1Error = !(data?.username || '').trim() && language.translate('errorEmailAddress', 'Please enter a password!');
  const password2Error = data?.password1 !== data?.password2 && language.translate('errorPasswordMatch', 'Passwords do not match!');
  const valid = !userError && !emailError && !password1Error && !password2Error;

  const [submitError, setSubmitError] = useState(null);

  function signup() {
    firebase.doCreateUser(data.email, data.password1).then(authUser => {
      return firebase.user(authUser.user.uid).set({ username: data.username, email: data.email, roles: [ROLE.REGISTERED] });
    }).then(() => {
      history.push(catalog.Home.path)
    }).catch(error => {
      setSubmitError(error.message);
    });
  }

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleCreateAccount', 'Create Account')}</Header>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Divider vertical>Or</Divider>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Form onSubmit={handleSubmit}>
                  <Popup position='right center' open={!!userError} flowing trigger={
                    <Form.Input fluid icon='user' iconPosition='left' placeholder={language.translate('labelUsername', 'User name')}
                      name='username' value={data.username} onChange={handleInputChange} error={!!userError} />}>
                    <Popup.Content><Icon name='exclamation circle' />{userError}</Popup.Content>
                  </Popup>
                  <Popup position='right center' open={!!emailError} flowing trigger={
                    <Form.Input fluid icon='mail' iconPosition='left' placeholder={language.translate('labelEmail', 'E-mail address')}
                      name='email' value={data.email} onChange={handleInputChange} error={!!emailError} />}>
                    <Popup.Content><Icon name='exclamation circle' />{emailError}</Popup.Content>
                  </Popup>
                  <Popup position='right center' open={!!password1Error} flowing trigger={
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder={language.translate('labelPassword', 'Password')} type='password'
                      name='password1' value={data.password1} onChange={handleInputChange} error={!!password1Error} />}>
                    <Popup.Content><Icon name='exclamation circle' />{password1Error}</Popup.Content>
                  </Popup>
                  <Popup position='right center' open={!!password2Error} flowing trigger={
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder={language.translate('labelRepeatPassword', 'Repeat password')} type='password'
                      name='password2' value={data.password2} onChange={handleInputChange} error={!!password2Error} />}>
                    <Popup.Content><Icon name='exclamation circle' />{password2Error}</Popup.Content>
                  </Popup>
                  <Popup position='right center' open={!!submitError} flowing trigger={
                    <Button fluid primary disabled={!valid}>{language.translate('buttonSignUp', 'Sign up')}</Button>}>
                    <Popup.Content><Icon name='exclamation circle' />{submitError}</Popup.Content>
                  </Popup>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Button fluid basic><Icon name='google' />{language.translate('buttonSignUpGoogle', 'Sign up with Google')}</Button>
                <Divider />
                <Button fluid color='facebook'><Icon name='facebook' />{language.translate('buttonSignUpFacebook', 'Sign up with Facebook')}</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

const Data = {
  id: 'signup',
  lang: 'signup',
  path: '/signup',
  name: 'SignUp',
  menu: false,
  comp: <SignUp />,
  role: ROLE.NONE
};

export default Data;
