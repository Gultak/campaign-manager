import React, { useState, useEffect, createRef } from 'react';
import { useForm } from '../tools/Hooks';
import { ConditionalWrapper } from '../tools/ConditionalWrapper';
import { Icon, Table, Form } from 'semantic-ui-react';


export function EditableData({ name, value, editable, editor, placeholder, onEdit, onSubmit, onCancel, strong }) {
  const inputRef = createRef();
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const { data, handleInputChange, handleSubmit } = useForm(saveData, { [name]: value });
  const Editor = editor;

  useEffect(() => setHover(hover => hover && !editing), [editing]);

  function saveData() {
    onSubmit && onSubmit(name, data[name]);
  }

  return (<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>{(editing
    ? <Table basic='very'>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Form>
              <Editor size='small' name={name} value={data[name]} onChange={handleInputChange} ref={inputRef} autoFocus onFocus={(e) => e.target.select()} />
            </Form>
          </Table.Cell>
          <Table.Cell>
            <Icon name='save' link onClick={() => { setEditing(false); handleSubmit(); }} style={{ marginLeft: '0.5em' }} />
            <Icon name='cancel' link onClick={() => { setEditing(false); onCancel && onCancel(); }} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    : <>
      <ConditionalWrapper condition={strong} wrapper={children => <strong>{children}</strong>}>{value || placeholder}&nbsp;</ConditionalWrapper>
      {hover && editable && <Icon link name='edit' onClick={() => { setEditing(true); onEdit && onEdit(name); }} />}
    </>
  )}
  </div>);
};
