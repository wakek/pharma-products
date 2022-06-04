import * as React from 'react';
import renderer from 'react-test-renderer';

import { NunitoText } from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<NunitoText>Snapshot test!</NunitoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
