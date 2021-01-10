import React from 'react';
import { _CONAN as CONAN } from '../../constants/systems';
import { useParams } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useCampaign } from '../../tools/Hooks';

export function CampaignSheetConan() {
  const { uid } = useParams();
  const { campaign } = useCampaign(uid);

  return <Image src={CONAN.image} centered />
}
