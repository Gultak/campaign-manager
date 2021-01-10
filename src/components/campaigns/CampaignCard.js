import React, { useContext } from 'react';
import * as SYSTEMS from '../../constants/systems';
import { Card, Label, Rail, Segment, Image } from 'semantic-ui-react';
import { LanguageContext } from '../../constants/contexts';
import { useCampaign } from '../../tools/Hooks';
import { formatDate } from '../../constants/functions';
import { CardPlaceholder } from '../layout/placeholder/CardPlaceholder';
import { CampaignAvatar } from './CampaignAvatar';
import { CampaignCharacters } from './CampaignCharacters';

export function CampaignCard(props) {
  const language = useContext(LanguageContext);
  const { uid } = props;
  const { campaign } = useCampaign(uid);

  const system = SYSTEMS.DEFS[campaign?.system];

  return campaign ?
    <Card {...props} campaignname={campaign.name}>
      <div className='relative'>
        <CampaignAvatar dummysize={512} uid={uid} />
        <Rail attached internal position='right'>
          <Segment basic>
            <Label ribbon='right' color='teal' ><Image src={system.image} /></Label>
          </Segment>
        </Rail>
      </div>
      <Card.Content>
        <Card.Header>{campaign.name}</Card.Header>
        <Card.Meta>{language.translate('labelCreatad', 'Created on:')}{' ' + formatDate(campaign.created)}</Card.Meta>
        <Card.Description>
          {campaign.description || language.translate('dummyDescription', '- no description available yet -')}
        </Card.Description>
      </Card.Content>
      <Card.Content extra><CampaignCharacters uid={uid} /></Card.Content>
    </Card > : <CardPlaceholder />;
}
