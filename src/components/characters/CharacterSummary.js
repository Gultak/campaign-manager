import React, { useContext, useState } from 'react';
import * as SYSTEMS from '../../constants/systems';
import Data from "../../pages/Characters";
import { Label, Segment, Image, Placeholder, Grid, Input, TextArea } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../../constants/contexts';
import { useCharacter, useUser } from '../../tools/Hooks';
import { CharacterCampaigns } from './CharacterCampaigns';
import { useHistory } from 'react-router-dom';
import { EditableData } from '../EditableData';

export function CharacterSummary(props) {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const { uid } = props;
  const { character } = useCharacter(uid);
  const { user } = useUser(character?.owner?.uid)
  const [editing, setEditing] = useState(false);

  const system = SYSTEMS.DEFS[character?.system];

  function onOpenCharSheet() {
    history.push(Data.path + '/' + uid + '/sheet');
  }

  function saveData(field, value) {
    firebase.character(uid).update({
      [field]: value
    }).then(() => {
      setEditing(false);
    }).catch((error) => {
      alert(error);
      setEditing(false);
    });
  }

  return (
    <Segment secondary placeholder={!character} loading={!character}>
      {character && <Label as='a' icon='newspaper' corner='right' size='massive' onClick={onOpenCharSheet} />}
      {character
        ? (<Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Image src={system.image} centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelCharName', 'Character name')}</Grid.Column>
            <Grid.Column>
              <EditableData name='name' editable={!editing} strong value={character.name} editor={Input}
                onEdit={setEditing} onSubmit={saveData} onCancel={() => setEditing(false)} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelPlayername', 'Player name')}</Grid.Column>
            <Grid.Column><strong>{user.username}</strong></Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelDescription', 'Description')}</Grid.Column>
            <Grid.Column>
              <Segment tertiary>
                <EditableData name='description' editable={!editing} value={character.description}
                  placeholder={language.translate('dummyDescription', '- no description available yet -')} editor={TextArea}
                  onEdit={setEditing} onSubmit={saveData} onCancel={() => setEditing(false)} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelCampaigns', 'Campaigns')}</Grid.Column>
            <Grid.Column><CharacterCampaigns uid={uid} /></Grid.Column>
          </Grid.Row>
        </Grid>)
        : (<Placeholder>
          <Placeholder.Header>
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>)}
    </Segment >);
}
