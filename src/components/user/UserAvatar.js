import React from 'react';
import { useUser } from '../../tools/Hooks';
import { Image, Placeholder } from 'semantic-ui-react';

export function UserAvatar({ avatar, size, uid, dark, style }) {
  const user = useUser(uid);

  const sizetext = size ? ('&size=' + size) : '';
  const darktext = dark ? '&background=8b5d5d&color=f0e9e9' : '';
  const wrapped = !avatar;
  const srcurl = user?.photoURL || 'https://eu.ui-avatars.com/api/?bold=true' + sizetext + darktext + '&name=' + user?.username;

  return (user ? <Image avatar={avatar} wrapped={wrapped} src={srcurl} style={style} /> : <Placeholder.Image />);
}
