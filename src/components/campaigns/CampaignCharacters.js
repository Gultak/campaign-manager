import React, { useContext, useState, useEffect } from "react";
import Data from "../../pages/Characters";
import { LanguageContext } from "../../constants/contexts";
import { Label, Icon } from "semantic-ui-react";
import { useCampaign } from "../../tools/Hooks";
import { useHistory } from "react-router-dom";

export function CampaignCharacters(props) {
  const language = useContext(LanguageContext);
  const history = useHistory();
  const { uid } = props;
  const { campaign } = useCampaign(uid);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState({});

  useEffect(() => {
    if (campaign) {
      setLoading(true);
      campaign.characters.forEach(character => {
        character.get().then(dataRef => setCharacters(c => { return { ...c, [dataRef.id]: dataRef }; }));
      });
    }
  }, [campaign]);

  function onCharacter(c, properties) {
    history.push(Data.path + '/' + properties.uid);
  }

  return (characters
    ? Object.values(characters).map(character => <Label as='a' onClick={onCharacter} key={character.id} uid={character.id} className='collection'>
      <Icon name='user' /> {character.data().name}
    </Label>)
    : (loading ? '' : language.translate('labelNoCharacters', '- no characters -')));
}
