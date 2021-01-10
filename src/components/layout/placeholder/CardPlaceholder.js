import React from 'react';
import { Placeholder } from "semantic-ui-react";

export function CardPlaceholder() {
  return (<>
    <Placeholder>
      <Placeholder.Image square />
    </Placeholder>
    <Placeholder className='padded'>
      <Placeholder.Header>
        <Placeholder.Line length="short" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  </>);
}