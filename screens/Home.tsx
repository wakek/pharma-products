import { useNavigation } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, IndexPath, Layout, List, MenuItem, OverflowMenu, Spinner, Text, withStyles } from '@ui-kitten/components';
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
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | undefined>(undefined);

  React.useEffect(() => {
    return () => {
    };
  }, [productsStore.products, productsStore.isLoading, productsStore.getIsLoading, productsStore.getProducts]);

  const onItemSelect = (index: IndexPath) => {
    setVisible(false);

    switch (index.row) {
      case 0:
        productsStore.loadProducts();
        break;
      case 1:
      default:
        break;
    }
  };

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
    const products = productsStore.getProducts;
    // sort by latest price date
    return products.slice().sort((a, b) => {
      const aDate = getLatestPriceDate(a);
      const bDate = getLatestPriceDate(b);
      return aDate > bDate ? -1 : 1;
    });
  };

  return (
    <Layout style={eva.style?.container}>
      <List
        // Add refresh control to enable pull to refresh
        refreshControl={
          <RefreshControl
            // set color of refresh control
            tintColor={eva && eva?.theme ? eva?.theme['color-primary-500'] : '#F4F5F6'}
            refreshing={productsStore.isLoading}
            onRefresh={() => productsStore.loadStoredProducts(500)}
          />
        }
        ListHeaderComponent={
          () => <>
            <View style={eva?.style?.headerTitleRow}>
              <View style={eva?.style?.titles}>
                <Text style={eva.style?.title} category='h3' status='primary'>
                  {Strings.EN.Our_Products}
                </Text>
                <Text style={eva.style?.subtitle} category='s1' status='basic'>
                  {Strings.EN.Products_Subtitle}
                </Text>
              </View>

              <OverflowMenu
                style={eva.style?.overflowMenu}
                anchor={() =>
                  <Button
                    status='basic'
                    size='tiny'
                    style={eva?.style?.settingsButton}
                    onPress={() => setVisible(true)}
                  >
                    <View>
                      <Icon
                        style={eva.style?.settingsIcon}
                        name="settings"
                        size={20}
                        fill={eva && eva?.theme ? eva.theme['color-basic-transparent-600'] : '#F4F5F6'}
                      />
                    </View>
                  </Button>}
                selectedIndex={selectedIndex}
                visible={visible}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}>
                <MenuItem title={
                  <Text category='s1'>
                    {Strings.EN.Reset_data}
                  </Text>
                } />
              </OverflowMenu>
            </View>
          </>
        }
        ListHeaderComponentStyle={eva.style?.listHeader}
        ListEmptyComponent={
          () => !productsStore.getIsLoading ? <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={eva.style?.noDataText} category='h6'>
              {Strings.EN['No data']}
            </Text>
          </View> : <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Spinner />
          </View>
        }
        style={eva.style?.listContainer}
        contentContainerStyle={[eva.style?.contentContainer]}
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
  headerTitleRow: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flx-start',
    marginTop: 15,
  },
  titles: {
    flexDirecton: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  },
  overflowMenu: {
  },
  settingsButton: {
    flex: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  settingsIcon: {
    flex: 0,
    width: 20,
    height: 20,
    margin: 0,
  }
}));

export default Home;