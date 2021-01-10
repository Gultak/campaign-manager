import React, { useContext, useEffect, useState } from "react";
import Data from "../../pages/Campaigns";
import { LanguageContext, FirebaseContext } from "../../constants/contexts";
import { Label, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export function CharacterCampaigns(props) {
  const language = useContext(LanguageContext);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const { uid } = props;
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setLoading(true);
    return firebase.campaigns().where('characters', 'array-contains', firebase.character(uid)).onSnapshot(snapshot => {
      const campaigns = snapshot.docs;
      setCampaigns(campaigns);
      setLoading(false);
    });
  }, [firebase, uid]);

  function onCampaign(c, properties) {
    history.push(Data.path + '/' + properties.uid);
  }

  return (campaigns.length
    ? campaigns.map(campaign => <Label as='a' onClick={onCampaign} key={campaign.id} uid={campaign.id} className='collection'><Icon name='world' /> {campaign.data().name}</Label>)
    : (loading ? '' : language.translate('labelNoCampaign', '- no campaign -')));
}
