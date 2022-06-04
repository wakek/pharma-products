import {
    light,
    mapping
} from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import renderer from 'react-test-renderer';
import RootStoreProvider from '../../hooks/useRootStore';
import PriceChangeListItem from '../PriceChangeListItem';


it(`PriceChangeListItem renders correctly`, () => {
  const tree = renderer.create(
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <RootStoreProvider>
            <PriceChangeListItem
                price={
                    {
                        "id": 1,
                        "price": 10.99,
                        "date": "2019-01-01T17:16:32+00:00"
                    }
                }
                priceChange={10}
                productId={1}
            />
        </RootStoreProvider>
        </ApplicationProvider>
    </>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
