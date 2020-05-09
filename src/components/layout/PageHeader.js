import React, { useState, useContext } from 'react';
import * as ROLE from "../../constants/roles";
import * as catalog from "../../pages"
import { Visibility, Segment, Container, Header, Menu } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router'
import { LanguageContext, UserContext } from '../../constants/contexts'
import { UserMenu } from './header/UserMenu';
import { LoginMenu } from './header/LoginMenu';
import { LanguageSelector } from './header/LanguageSelector';


function PageHeader() {
  const [fixed, setFixed] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const language = useContext(LanguageContext)
  const user = useContext(UserContext)

  const menu = [...Object.values(catalog)].sort((a, b) => a.sort - b.sort).filter(item => item.menu && item.role !== ROLE.NONE && (user?.roles || []).includes(item.role));

  return (
    <Visibility onBottomPassed={() => setFixed(true)} onBottomPassedReverse={() => setFixed(false)} once={false} catalog={catalog}>
      <Segment inverted textAlign='center' style={{ padding: '2em 0em 1em 0em' }} vertical>
        <Container>
          <Header inverted as='h1'>{language.translate('appTitle', 'Campaign Manager')}</Header>
          <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large'>
            {menu.map(item => <Menu.Item key={item.id} active={item.path === location.pathname} onClick={() => history.push(item.path)}>{language.translate(item.lang, item.name)}</Menu.Item>)}
            {user?.authenticated ? <UserMenu menu={menu} /> : <LoginMenu />}
            <Menu.Item style={{ paddingLeft: '0em', paddingRight: '0em' }}><LanguageSelector /></Menu.Item>
          </Menu>
        </Container>
      </Segment>
    </Visibility >
  );
};

export default PageHeader;
