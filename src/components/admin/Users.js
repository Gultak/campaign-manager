import React, { useContext, useState, useEffect } from 'react';
import * as ROLE from "../../constants/roles"
import { Label, Table, Header, Segment, Icon, Message, Input, Form, Dropdown } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext, UserContext } from '../../constants/contexts';
import { useForm } from '../../tools/Hooks';
import { UserAvatar } from '../user/UserAvatar';

function UserRoles({ roles, edit, onChange }) {
  const language = useContext(LanguageContext);

  return edit
    ? <Dropdown placeholder={language.translate('labelRoles', 'Roles')} multiple selection name='roles' value={roles}
      onChange={(event, input) => {
        event.target = input;
        onChange(event);
      }} options={
        Object.values(ROLE).filter(role => role !== ROLE.NONE).map(role => {
          return { key: role, text: language.translate(`role${role}`, role), value: role };
        })
      } />
    : (roles || []).map(role => <Label key={role}>{language.translate(`role${role}`, role)}</Label>);
}

export function Users() {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { handleInputChange, handleSubmit, data, setData } = useForm(commitEdit);

  useEffect(() => {
    setLoading(true);
    return firebase.users().onSnapshot(snapshot => {
      const users = snapshot.docs.map(userData => {
        return {
          ...userData.data(),
          uid: userData.id,
          hover: false
        };
      });
      setUsers(users);
      setLoading(false);
    });
  }, [firebase]);

  function updateHover(uid, state) {
    const newUsers = users.map(item => {
      return item.uid === uid ? { ...item, hover: state } : { ...item };
    });
    setUsers(newUsers);
  }

  function beginEdit(uid) {
    const editUser = users.reduce((prev, item) => item.uid === uid ? item : prev);
    setData({
      uid: uid,
      editing: true,
      username: editUser.username,
      roles: editUser.roles
    });
  }

  function cancelEdit() {
    setData({ editing: false });
  }

  function commitEdit() {
    setLoading(true);
    const newUsers = users.map(item => {
      return item.uid === data.uid ? { ...item, username: data.username, roles: data.roles } : { ...item };
    });
    setError(null);
    firebase.user(data.uid).update({
      username: data.username,
      roles: data.roles
    }).then(() => {
      setUsers(newUsers);
      setData({ editing: false });
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }

  return (
    <>
      <Segment loading={loading} attached={error ? 'top' : false}>
        <Form onSubmit={handleSubmit}>
          <Table selectable basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{language.translate('labelUsername', 'User name')}</Table.HeaderCell>
                <Table.HeaderCell>{language.translate('labelEmail', 'E-mail address')}</Table.HeaderCell>
                <Table.HeaderCell>{language.translate('labelRoles', 'Roles')}</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(item => {
                const editrow = data.editing && data.uid === item.uid;
                return (
                  <Table.Row active={user.uid === item.uid} key={item.uid} onMouseOver={() => updateHover(item.uid, true)} onMouseOut={() => updateHover(item.uid, false)}>
                    <Table.Cell collapsing>
                      <Label ribbon>
                        <UserAvatar uid={user.uid} avatar dark />
                        {editrow
                          ? <Input name='username' value={data.username} onChange={handleInputChange} />
                          : <>{item.username}</>}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      {item.email}
                      <Header size='tiny' disabled textAlign='right' style={{ marginTop: '0em' }}>{item.uid}</Header>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <UserRoles roles={editrow ? data.roles : item.roles} edit={editrow} onChange={handleInputChange} />
                    </Table.Cell>
                    <Table.Cell collapsing>{data.editing
                      ? (data.uid === item.uid
                        ? (<><Icon name='save' link onClick={commitEdit} /><Icon name='cancel' link onClick={cancelEdit} /></>)
                        : (<><Icon name='' /><Icon name='' /></>))
                      : (<><Icon name='' /><Icon name={item.hover ? 'edit' : ''} link={item.hover} onClick={() => beginEdit(item.uid)} /></>)}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign='right' colSpan='4'>Users: {users.length}</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Form>
      </Segment>
      {error && <Message attached='bottom' error>{error}</Message>}
    </>
  )
}

const Data = {
  id: 'users',
  lang: 'admin-users',
  name: 'User Administration',
  comp: <Users />
};

export default Data;
