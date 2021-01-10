import React, { useContext } from 'react';
import * as SYSTEMS from '../../constants/systems';
import { Card, Label, Rail, Segment, Image } from 'semantic-ui-react';
import { LanguageContext } from '../../constants/contexts';
import { useCharacter } from '../../tools/Hooks';
import { formatDate } from '../../constants/functions';
import { CardPlaceholder } from '../layout/placeholder/CardPlaceholder';
import { CharacterAvatar } from './CharacterAvatar';
import { CharacterCampaigns } from './CharacterCampaigns';

export function CharacterCard(props) {
  const language = useContext(LanguageContext);
  const { uid } = props;
  const { character } = useCharacter(uid);

  const system = SYSTEMS.DEFS[character?.system];

  return character ?
    <Card {...props} charactername={character.name}>
      <div className='relative'>
        <CharacterAvatar dummysize={512} uid={uid} />
        <Rail attached internal position='right'>
          <Segment basic>
            <Label ribbon='right' color='teal' ><Image src={system.image} /></Label>
          </Segment>
        </Rail>
      </div>
      <Card.Content>
        <Card.Header>{character.name}</Card.Header>
        <Card.Meta>{language.translate('labelCreatad', 'Created on:')}{' ' + formatDate(character.created)}</Card.Meta>
        <Card.Description>
          {character.description || language.translate('dummyDescription', '- no description available yet -')}
        </Card.Description>
      </Card.Content>
      <Card.Content extra><CharacterCampaigns uid={uid} /></Card.Content>
    </Card > : <CardPlaceholder />;
}
