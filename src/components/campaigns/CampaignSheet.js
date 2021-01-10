import React from 'react';
import * as SYSTEMS from '../../constants/systems';
import { Segment } from 'semantic-ui-react';
import { useCampaign } from '../../tools/Hooks';
import { useParams } from 'react-router-dom';

export function CampaignSheet() {
  const { uid } = useParams();
  const { campaign } = useCampaign(uid);
  const system = SYSTEMS.DEFS[campaign?.system];

  return (!campaign
    ? <Segment placeholder loading />
    : (system ? <system.campaignSheet /> : null));
}
