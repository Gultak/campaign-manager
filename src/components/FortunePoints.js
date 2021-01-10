import React from 'react';
import { Icon } from 'semantic-ui-react';

export function FortunePoints({ value }) {
  const { total, used } = value;

  return (<>{[0, 1, 2, 3, 4].map(index =>
    <Icon name={
      index < total
        ? (index < used
          ? 'circle outline'
          : 'check circle outline')
        : 'times circle outline'} />
  )}</>);
}
