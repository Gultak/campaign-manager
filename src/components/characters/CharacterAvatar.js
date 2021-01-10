import React from 'react';
import { useCharacter } from '../../tools/Hooks';
import { Image, Placeholder } from 'semantic-ui-react';

export function CharacterAvatar(props) {
  const { avatar, dummysize, uid, dark } = props;
  const { character } = useCharacter(uid);

  const sizetext = dummysize ? ('&size=' + dummysize) : '';
  const darktext = dark ? '&background=8b5d5d&color=f0e9e9' : '';
  const wrapped = !avatar;

  const srcurl = character?.avatarURL || 'https://eu.ui-avatars.com/api/?bold=true' + sizetext + darktext + '&name=' + character?.name;

  return (character ? <Image wrapped={wrapped} src={srcurl} {...props} dark={undefined} dummysize={undefined} /> : <Placeholder.Image />);
}
