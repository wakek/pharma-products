import { useNavigation } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, IndexPath, Layout, List, MenuItem, OverflowMenu, Spinner, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, RefreshControl, SafeAreaView, View } from 'react-native';
import Toast from 'react-native-root-toast';
import ProductListItem from '../components/ProductListItem';
import ScreenHeader from '../components/ScreenHeader';
import { NunitoText } from '../components/StyledText';
import { Strings } from '../constants/Strings';
import { ThemeContext } from '../contexts/theme-context';
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
  const themeContext = React.useContext(ThemeContext);

  React.useEffect(() => {
    return () => {
    };
  }, [productsStore.products, productsStore.isLoading, productsStore.getIsLoading, productsStore.getProducts]);

  const onItemSelect = (index: IndexPath) => {
    setVisible(false);

    switch (index.row) {
      case 0:
        resetData();
        break;
      case 1:
        themeContext.toggleTheme();
        break;
      default:
        break;
    }
  };

  const resetData = async () => {
    await productsStore.loadProducts();
    Toast.show(Strings.EN.Data_reset_successfully, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM * 2.5,
    });
  }

  const renderListItem = (product: ListRenderItemInfo<Product>) => (
    <ProductListItem product={product.item} />
  );

  const getLatestPriceDate = (product: Product): Date => {
    return product.prices.reduce((latestDate, price) => {
      const date = new Date(price.date);
      if (date > latestDate) {
        return date;
      }
      return latestDate;
    }, new Date(0));
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
      <SafeAreaView style={{ flex: 1 }}>
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
                <View style={eva?.style?.screenHeader}>
                  <ScreenHeader
                    title={Strings.EN.Our_Products}
                    subtitle={Strings.EN.Products_Subtitle}
                  />
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
                    <NunitoText
                      category='s1'
                      weight='medium'
                    >
                      {Strings.EN.Reset_data}
                    </NunitoText>
                  } />
                  <MenuItem title={
                    <NunitoText
                      category='s1'
                      weight='medium'
                    >
                      {Strings.EN.Toggle_theme}
                    </NunitoText>
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
              <NunitoText
                style={eva.style?.noDataText}
                category='h6'
                weight='bold'
              >
                {Strings.EN['No data']}
              </NunitoText>
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
      </SafeAreaView>
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
  screenHeader: {
    flex: 1,
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