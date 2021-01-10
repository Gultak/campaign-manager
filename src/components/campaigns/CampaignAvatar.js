import React from 'react';
import { useCampaign } from '../../tools/Hooks';
import { Image, Placeholder } from 'semantic-ui-react';

export function CampaignAvatar(props) {
  const { avatar, dummysize, uid, dark } = props;
  const { campaign } = useCampaign(uid);

  const sizetext = dummysize ? ('&size=' + dummysize) : '';
  const darktext = dark ? '&background=8b5d5d&color=f0e9e9' : '';
  const wrapped = !avatar;

  const srcurl = campaign?.avatarURL || 'https://eu.ui-avatars.com/api/?bold=true' + sizetext + darktext + '&name=' + campaign?.name;

  return (campaign ? <Image wrapped={wrapped} src={srcurl} {...props} dark={undefined} dummysize={undefined} /> : <Placeholder.Image />);
}
