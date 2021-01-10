import React from 'react';
import { _INFINITY as INFINITY } from '../../constants/systems';
import { useParams } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useCampaign } from '../../tools/Hooks';

export function CampaignSheetInfinity() {
  const { uid } = useParams();
  const { campaign } = useCampaign(uid);

  return <Image src={INFINITY.image} centered />
}
