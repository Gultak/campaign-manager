import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { CampaignCard } from './CampaignCard';
import { CampaignSummary } from './CampaignSummary';
import { useCampaign } from '../../tools/Hooks';
import { useParams } from 'react-router-dom';
import { CampaignAvatar } from './CampaignAvatar';

export function CampaignView() {
  const { uid } = useParams();
  const { campaign } = useCampaign(uid);

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'><CampaignAvatar avatar uid={uid} />{campaign?.name}</Header>
        <Segment placeholder={!campaign} loading={!campaign} textAlign='left'>{campaign ?
          <Grid columns='equal' relaxed='very' stackable>
            <Grid.Row>
              <Grid.Column width={5}>
                <CampaignCard uid={uid} />
              </Grid.Column>
              <Grid.Column stretched>
                <CampaignSummary uid={uid} />
              </Grid.Column>
            </Grid.Row>
          </Grid> : <></>}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
