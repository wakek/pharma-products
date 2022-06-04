import {
  light,
  mapping
} from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import renderer from 'react-test-renderer';
import ScreenHeader from '../ScreenHeader';

it(`ScreenHeader renders correctly`, () => {
  
  const tree = renderer.create(
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
        <ScreenHeader
          title="Title"
          subtitle="Subtitle"
        />
    </ApplicationProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
