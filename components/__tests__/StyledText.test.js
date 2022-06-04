import {
  light,
  mapping
} from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import renderer from 'react-test-renderer';
import { NunitoText } from '../StyledText';

it(`NunitoText renders correctly`, () => {
  
  const tree = renderer.create(
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
        <NunitoText>Hello World</NunitoText>
    </ApplicationProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
