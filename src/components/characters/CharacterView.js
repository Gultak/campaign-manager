import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { CharacterCard } from './CharacterCard';
import { CharacterSummary } from './CharacterSummary';
import { useCharacter } from '../../tools/Hooks';
import { useParams } from 'react-router-dom';
import { CharacterAvatar } from './CharacterAvatar';

export function CharacterView() {
  const { uid } = useParams();
  const { character } = useCharacter(uid);

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'><CharacterAvatar avatar uid={uid} />{character?.name}</Header>
        <Segment placeholder={!character} loading={!character} textAlign='left'>{character ?
          <Grid columns='equal' relaxed='very' stackable>
            <Grid.Row>
              <Grid.Column width={5}>
                <CharacterCard uid={uid} />
              </Grid.Column>
              <Grid.Column stretched>
                <CharacterSummary uid={uid} />
              </Grid.Column>
            </Grid.Row>
          </Grid> : <></>}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
