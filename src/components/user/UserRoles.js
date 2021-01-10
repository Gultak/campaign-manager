import React, { useContext } from "react";
import * as ROLE from "../../constants/roles"
import { LanguageContext } from "../../constants/contexts";
import { Dropdown, Label } from "semantic-ui-react";

export function UserRoles({ roles, edit, onChange }) {
  const language = useContext(LanguageContext);

  return edit
    ? <Dropdown placeholder={language.translate('labelRoles', 'Roles')} multiple selection name='roles' value={roles}
      onChange={(event, input) => {
        event.target = input;
        onChange(event);
      }} options={
        Object.values(ROLE).filter(role => role !== ROLE.NONE).map(role => {
          return { key: role, text: language.translate(`role-${role}`, role.toUpperCase()), value: role };
        })
      } />
    : (roles || []).map(role => <Label key={role} className='collection'>{language.translate(`role-${role}`, role.toUpperCase())}</Label>);
}
