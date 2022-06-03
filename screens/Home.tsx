import { useNavigation } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, Layout, List, Text, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, RefreshControl, View } from 'react-native';
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
  const _navigation = useNavigation();

  React.useEffect(() => {
    return () => {
    };
  }, [productsStore.products, productsStore.isLoading, productsStore.getIsLoading, productsStore.getProducts]);

  const renderListItem = (product: ListRenderItemInfo<Product>) => (
    <ProductListItem product={product.item} />
  );

  const getLatestPriceDate = (product: Product): Date => {
    // get latest date from list of strings in product.prices
    const latestPriceDate = product.prices.reduce((latestDate, price) => {
      const date = new Date(price.date);
      if (date > latestDate) {
        return date;
      }
      return latestDate;
    }, new Date(0));

    // return date as MMM DD, YYYY
    return latestPriceDate;
  };

  const getSortedProducts = () => {
    const products = productsStore.products;
    // sort by latest price date
    return products.slice().sort((a, b) => {
      const aDate = getLatestPriceDate(a);
      const bDate = getLatestPriceDate(b);
      return aDate > bDate ? -1 : 1;
    });
  };

  return (
    <Layout style={eva.style?.container}>
      {/* {productsStore.getProducts.length === 0 && productsStore.getIsLoading &&
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Spinner />
        </View>
      } */}

      <List
        // Add refresh control to enable pull to refresh
        refreshControl={
          <RefreshControl
            refreshing={productsStore.isLoading}
            onRefresh={() => productsStore.loadStoredProducts(500)}
          />
        }
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
        ListEmptyComponent={
          () => <View
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
        style={eva.style?.listContainer}
        // toggle visibility based on isLoading
        contentContainerStyle={[eva.style?.contentContainer, { display: productsStore.isLoading ? 'none' : 'flex' }]}
        data={getSortedProducts()}
        renderItem={renderListItem}
        ItemSeparatorComponent={Divider}
      />

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
        onPress={() => _navigation.navigate('AddProduct')}
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
    paddingBottom: 20,
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