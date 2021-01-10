import React from 'react';
import { useUser } from '../../tools/Hooks';
import { Image, Placeholder } from 'semantic-ui-react';

export function UserAvatar(props) {
  const { avatar, dummysize, uid, dark } = props;
  const { user } = useUser(uid);

  const sizetext = dummysize ? ('&size=' + dummysize) : '';
  const darktext = dark ? '&background=8b5d5d&color=f0e9e9' : '';
  const wrapped = !avatar;

  const srcurl = user?.avatarURL || 'https://eu.ui-avatars.com/api/?bold=true' + sizetext + darktext + '&name=' + user?.username;

  return (user ? <Image wrapped={wrapped} src={srcurl} {...props} dark={undefined} dummysize={undefined} /> : <Placeholder.Image />);
}
