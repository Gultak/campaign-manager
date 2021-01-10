import React from 'react';
import { Segment, Container } from 'semantic-ui-react'

export function ContentFooter() {
  return (
    <Segment inverted vertical>
      <Container>
        2D20 Campaign Manager - &copy; 2020 <a target='_blank' rel='noopener noreferrer' href='mailto:campaign-manager-admin@gultak.de'>Peter Walter</a>
      </Container>
    </Segment>
  );
}
