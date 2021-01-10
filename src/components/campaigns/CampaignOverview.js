import React, { createRef, useEffect, useContext, useState } from 'react';
import Data from "../../pages/Campaigns";
import { Segment, Card, Rail, Sticky, Ref, Grid, Header } from 'semantic-ui-react';
import { useUser } from '../../tools/Hooks';
import { FirebaseContext, LanguageContext } from '../../constants/contexts';
import { CampaignCard } from './CampaignCard';
import { CampaignPopup } from './CampaignPopup';
import { useHistory } from 'react-router-dom';

export function CampaignOverview() {
  const buttonRef = createRef();
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const language = useContext(LanguageContext);
  const { userid } = useUser();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setLoading(true);
    return firebase.campaigns().where('owner', '==', firebase.user(userid)).onSnapshot(snapshot => {
      const campaigns = snapshot.docs;
      setCampaigns(campaigns);
      setLoading(false);
    });
  }, [firebase, userid]);

  function onOpenCampaign(c, properties) {
    history.push(Data.path + '/' + properties.uid);
  }

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{language.translate('titleCampaigns', 'Campaigns')}</Header>
        <Segment secondary clearing loading={loading} style={{ minHeight: '4em' }} textAlign='left'>
          <Ref innerRef={buttonRef}>
            <Card.Group itemsPerRow={4}>
              {campaigns.map(item =>
                <CampaignCard key={item.id} as='a' uid={item.id} style={{ minHeight: '20em' }} onClick={onOpenCampaign} />)}
            </Card.Group>
          </Ref>
          <Rail attached internal position='right' className="padded">
            <Sticky offset={50} context={buttonRef}>
              <CampaignPopup />
            </Sticky>
          </Rail>
        </Segment >
      </Grid.Column>
    </Grid>
  );
}
