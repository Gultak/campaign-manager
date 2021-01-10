import React, { useContext, useState } from 'react';
import * as SYSTEMS from '../../constants/systems';
import Data from "../../pages/Campaigns";
import { Label, Segment, Image, Placeholder, Grid, Input, TextArea } from 'semantic-ui-react';
import { LanguageContext, FirebaseContext } from '../../constants/contexts';
import { useCampaign, useUser } from '../../tools/Hooks';
import { CampaignCharacters } from './CampaignCharacters';
import { EditableData } from '../EditableData';
import { useHistory } from 'react-router-dom';

export function CampaignSummary(props) {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const { uid } = props;
  const { campaign } = useCampaign(uid);
  const { user } = useUser(campaign?.owner?.uid)
  const [editing, setEditing] = useState(false);

  const system = SYSTEMS.DEFS[campaign?.system];

  function onOpenCampaignSheet() {
    history.push(Data.path + '/' + uid + '/sheet');
  }

  function saveData(field, value) {
    firebase.campaign(uid).update({
      [field]: value
    }).then(() => {
      setEditing(false);
    }).catch((error) => {
      alert(error);
      setEditing(false);
    });
  }

  return (
    <Segment secondary placeholder={!campaign} loading={!campaign} >
      {campaign && <Label as='a' icon='newspaper' corner='right' size='massive' onClick={onOpenCampaignSheet} />}
      {campaign
        ? (<Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Image src={system.image} centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelCampaignName', 'Campaign name')}</Grid.Column>
            <Grid.Column>
              <EditableData name='name' editable={!editing} strong value={campaign.name} editor={Input}
                onEdit={setEditing} onSubmit={saveData} onCancel={() => setEditing(false)} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelGameMaster', 'Game Master')}</Grid.Column>
            <Grid.Column><strong>{user.username}</strong></Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelDescription', 'Description')}</Grid.Column>
            <Grid.Column>
              <Segment tertiary>
                <EditableData name='description' editable={!editing} value={campaign.description}
                  placeholder={language.translate('dummyDescription', '- no description available yet -')} editor={TextArea}
                  onEdit={setEditing} onSubmit={saveData} onCancel={() => setEditing(false)} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='narrow' verticalAlign='middle'>
            <Grid.Column width={3}>{language.translate('labelCharacters', 'Characters')}</Grid.Column>
            <Grid.Column><CampaignCharacters uid={uid} /></Grid.Column>
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
