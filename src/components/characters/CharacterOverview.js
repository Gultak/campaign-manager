import React, { createRef, useEffect, useContext, useState } from 'react';
import Data from "../../pages/Characters";
import { Segment, Card, Rail, Sticky, Ref, Grid, Header } from 'semantic-ui-react';
import { useUser } from '../../tools/Hooks';
import { FirebaseContext, LanguageContext } from '../../constants/contexts';
import { CharacterCard } from './CharacterCard';
import { CharacterPopup } from './CharacterPopup';
import { useHistory } from 'react-router-dom';

export function CharacterOverview() {
  const buttonRef = createRef();
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const language = useContext(LanguageContext);
  const { userid } = useUser();
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setLoading(true);
    return firebase.characters().where('owner', '==', firebase.user(userid)).onSnapshot(snapshot => {
      const characters = snapshot.docs;
      setCharacters(characters);
      setLoading(false);
    });
  }, [firebase, userid]);

  function onOpenCharacter(c, properties) {
    history.push(Data.path + '/' + properties.uid);
  }

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleCharacters', 'Characters')}</Header>
        <Segment secondary clearing loading={loading} style={{ minHeight: '4em' }} textAlign='left'>
          <Ref innerRef={buttonRef}>
            <Card.Group itemsPerRow={4}>
              {characters.map(item =>
                <CharacterCard key={item.id} as='a' uid={item.id} style={{ minHeight: '20em' }} onClick={onOpenCharacter} />)}
            </Card.Group>
          </Ref>
          <Rail attached internal position='right' className="padded">
            <Sticky offset={50} context={buttonRef}>
              <CharacterPopup />
            </Sticky>
          </Rail>
        </Segment >
      </Grid.Column>
    </Grid>
  );
}
