import React, { useContext } from 'react';
import * as catalog from "../../pages"
import { Container } from 'semantic-ui-react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../constants/contexts';
import { useTimer } from '../../tools/Hooks';


function AuthorizationWrapper({ condition, component }) {
  const user = useContext(UserContext);
  const redirect = useTimer(2000);

  return (condition ? component : (redirect ? <Redirect to={user?.authenticated ? catalog.Home.path : catalog.Landing.path} /> : <Container />));
}

export function MainContent() {
  const user = useContext(UserContext);

  return (
    <Container className='main-content'>
      <Switch>
        {Object.values(catalog).map(item =>
          <Route key={item.name} path={item.path} render={() =>
            <AuthorizationWrapper condition={(user?.user?.roles || []).includes(item.role)} component={item.comp} />} />
        )}
        <Route render={() => <Redirect to={user?.authenticated ? catalog.Home.path : catalog.Landing.path} />} />
      </Switch>
    </Container>
  );
}
