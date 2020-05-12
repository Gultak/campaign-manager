import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export function PageContent({ title, items }) {
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column>
        <Header as='h2'>{title}</Header>
        {[...Object.values(items)].sort((a, b) => a.sort - b.sort).map(item => <React.Fragment key={item.id}>{item.comp}</React.Fragment>)}
      </Grid.Column>
    </Grid>
  );
}
