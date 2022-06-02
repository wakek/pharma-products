import { Button, Divider, EvaProp, Icon, Layout, List, Spinner, Text, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import { Strings } from '../constants/Strings';
import { useRootStore } from '../hooks/useRootStore';
import { Product } from '../models/Product';
import { RootScreenProps } from '../types';


interface HomeProps {
  navigation: RootScreenProps,
  eva: EvaProp,
}

const _Home = observer(({ navigation, eva }: HomeProps) => {
  const { productsStore } = useRootStore();

  React.useEffect(() => {
    return () => {
    };
  }, [productsStore.products, productsStore.isLoading]);

  const renderListItem = (product: ListRenderItemInfo<Product>) => (
    <ProductListItem product={product.item} />
  );

  return (
    <Layout style={eva.style?.container}>
      {productsStore.getIsLoading &&
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Spinner />
        </View>
      }

      {(!productsStore.getIsLoading && productsStore.getProducts.length > 0) && <List
        ListHeaderComponent={
          () => <>
            <Text style={eva.style?.h6} category='h3' status='primary'>
              {Strings.EN.Our_Products}
            </Text>
            <Text style={eva.style?.subtitle} category='s1' status='basic'>
              {Strings.EN.Products_Subtitle}
            </Text>
          </>
        }
        ListHeaderComponentStyle={eva.style?.listHeader}
        style={eva.style?.listContainer}
        contentContainerStyle={eva.style?.contentContainer}
        data={productsStore.products}
        renderItem={renderListItem}
        ItemSeparatorComponent={Divider}
      />}

      {(!productsStore.getIsLoading && productsStore.getProducts.length == 0) && <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={eva.style?.noDataText} category='h6'>
          {Strings.EN['No data']}
        </Text>
      </View>
      }

      <Button
        style={eva.style?.fab}
        size='large'
        status='primary'
        accessoryLeft={
          <Icon
            name="plus"
            size={20}
            fill="#fff"
          />
        }
      >
        {Strings.EN.Add.toUpperCase()}
      </Button>
    </Layout>
  );
});

const Home = withStyles(_Home, theme => ({
  container: {
    flex: 1,
  },
  h6: {
    marginTop: 30,
    marginBottom: 5,
    fontFamily: 'Nunito-ExtraBold',
  },
  subtitle: {
    marginBottom: 20,
    opacity: 0.7,
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
  },
  listHeader: {
    paddingHorizontal: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
  },
  contentContainer: {
    marginBottom: 10,
  },
  fab: {
    // react native position absolute
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  },
}));

export default Home;