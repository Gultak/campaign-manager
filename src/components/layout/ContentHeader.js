import React, { useState, useContext } from 'react';
import * as ROLE from "../../constants/roles";
import * as catalog from "../../pages"
import { Visibility, Segment, Container, Header, Menu, Icon } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router'
import { LanguageContext, UserContext } from '../../constants/contexts'
import { UserMenu } from './header/UserMenu';
import { LoginMenu } from './header/LoginMenu';
import { LanguageSelector } from './header/LanguageSelector';

export function ContentHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const language = useContext(LanguageContext);
  const user = useContext(UserContext);

  const fixed = collapsed || scrolled;

  const menu = [...Object.values(catalog)].sort((a, b) => a.sort - b.sort)
    .filter(item => item.role !== ROLE.NONE && (user?.user?.roles || []).includes(item.role));

  return (
    <Visibility onBottomPassed={() => setScrolled(true)} onBottomPassedReverse={() => setScrolled(false)} once={false} catalog={catalog}>
      <Segment inverted={!fixed} textAlign='center' className={'content-header overlay' + (fixed ? ' fixed' : '')} vertical>
        <Container>
          <Header inverted as='h1'>{language.translate('appTitle', 'Campaign Manager')}</Header>
          <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large' stackable>
            {menu.map(item => <Menu.Item key={item.id} active={item.path === location.pathname} onClick={() => history.push(item.path)}>{language.translate(item.lang, item.name)}</Menu.Item>)}
            {user?.authenticated ? <UserMenu menu={menu} /> : <LoginMenu />}
            <Menu.Item className='narrow'><LanguageSelector /></Menu.Item>
            <Menu.Item className='narrow'><Icon name={collapsed ? 'angle down' : 'angle up'} onClick={() => setCollapsed(!collapsed)} /></Menu.Item>
          </Menu>
        </Container>
      </Segment>
    </Visibility >
  );
};
