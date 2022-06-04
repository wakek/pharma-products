import {
    light,
    mapping
} from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import renderer from 'react-test-renderer';
import RootStoreProvider from '../../hooks/useRootStore';
import LinkingConfiguration from '../../navigation/LinkingConfiguration';
import ProductListItem from '../ProductListItem';

jest.useFakeTimers()

it(`ProductListItem renders correctly`, () => {
  const tree = renderer.create(
    <NavigationContainer
    linking={LinkingConfiguration}
  >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <RootStoreProvider>
            <ProductListItem
                product={
                    {
                        "id": 1,
                        "name": "Exforge 10mg",
                        "prices": [
                            {
                                "id": 1,
                                "price": 10.99,
                                "date": "2019-01-01T17:16:32+00:00"
                            },
                            {
                                "id": 2,
                                "price": 9.20,
                                "date": "2018-11-01T17:16:32+00:00"
                            }
                        ]
                    }
                }
            />
        </RootStoreProvider>
        </ApplicationProvider>
    </NavigationContainer>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
