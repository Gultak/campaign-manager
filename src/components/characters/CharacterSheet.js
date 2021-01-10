import React from 'react';
import * as SYSTEMS from '../../constants/systems';
import { Segment } from 'semantic-ui-react';
import { useCharacter } from '../../tools/Hooks';
import { useParams } from 'react-router-dom';

export function CharacterSheet() {
  const { uid } = useParams();
  const { character } = useCharacter(uid);
  const system = SYSTEMS.DEFS[character?.system];

  return (!character
    ? <Segment placeholder loading />
    : (system ? <system.characterSheet /> : null));
}
