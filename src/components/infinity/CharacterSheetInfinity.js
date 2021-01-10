import React from 'react';
import { _INFINITY as INFINITY } from '../../constants/systems';
import { useCharacter } from '../../tools/Hooks';
import { useParams } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

export function CharacterSheetInfinity() {
  const { uid } = useParams();
  const { character } = useCharacter(uid);

  return <Image src={INFINITY.image} centered />
}
