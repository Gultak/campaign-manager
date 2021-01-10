import React, { useContext } from 'react';
import * as SYSTEMS from '../../constants/systems';
import { Modal, Button, Image, Icon, Message, Form } from 'semantic-ui-react';
import { useForm, useUser } from '../../tools/Hooks';
import { useState } from 'react';
import { FirebaseContext, LanguageContext } from '../../constants/contexts';

const EMPTY_CAMPAIGN = {
  name: '- Campaign name -',
  system: SYSTEMS.DEFAULT,
  owner: null,
  imageURL: null
};

export function CampaignPopup() {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const { userid } = useUser();
  const { data, handleInputChange, handleSubmit } = useForm(saveCampaign, { ...EMPTY_CAMPAIGN, owner: firebase.user(userid) });

  const imageurl = data.imageUrl || ('https://eu.ui-avatars.com/api/?bold=true&size=256&name=' + data.name);

  function saveCampaign() {
    firebase.characters().add(data).then(() => {
      setError(null);
      setOpen(false);
    }).catch(error => setError(error?.message));
  }

  return (
    <Modal trigger={<Button circular icon='plus' primary floated='right' className='bottom-float' onClick={() => setOpen(true)} />}
      onClose={() => setOpen(false)} dimmer='inverted' open={open} >
      <Modal.Header>New Character</Modal.Header>
      <Modal.Content image>
        <Image wrapped src={imageurl} size='large' />
        <Modal.Description style={{ width: '100%' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Select label={language.translate('labelGameSystem', 'Game system')} fluid options={Object.keys(SYSTEMS.DEFS).map(key => {
              const system = SYSTEMS.DEFS[key];
              return {
                key: key,
                value: key,
                text: <Image src={system.image} />
              };
            })}
              name='system' value={data.system} onChange={handleInputChange} />
            <Form.Input fluid icon='user' iconPosition='left' label={language.translate('labelCampaignName', 'Campaign name')}
              name='name' value={data.name} onChange={handleInputChange} />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary animated='fade' onClick={handleSubmit}>
          <Button.Content visible><Icon name='disk' /></Button.Content><Button.Content hidden content='Save' />
        </Button>
      </Modal.Actions>
      {error && <Message attached='bottom' warning>{error}</Message>}
      {process.env.NODE_ENV === "development" && <Message attached='bottom'>{JSON.stringify({ ...data, owner: data.owner.id }, null, 2)}</Message>}
    </Modal >
  );
}
