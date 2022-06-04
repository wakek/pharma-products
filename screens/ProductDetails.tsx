import { Route, useNavigation } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, Layout, List, TopNavigation, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import PriceChangeListItem from '../components/PriceChangeListItem';
import ScreenHeader from '../components/ScreenHeader';
import { NunitoText } from '../components/StyledText';
import TopNavigationBackAction from '../components/TopNavigationBackAction';
import { Strings } from '../constants/Strings';
import { useRootStore } from '../hooks/useRootStore';
import { Price, Product } from '../models/Product';
import { ProductDetailsScreenProps } from '../types';


interface ProductDetailsProps {
  route: Route<string, { product?: Product }>;
  navigation: ProductDetailsScreenProps,
  eva: EvaProp,
}

const _ProductDetails = observer(({ route, navigation, eva }: ProductDetailsProps) => {
  const { productsStore } = useRootStore();
  const _navigation = useNavigation();
  const _product = route?.params?.product;
  const [product, setProduct] = React.useState<Product | undefined>();

  React.useEffect(() => {
    if (_product) {
      setProduct(productsStore.getProductById(_product.id));
    }

    return () => {
    };
  }, [productsStore.products, productsStore.isLoading, productsStore.getIsLoading, productsStore.getProducts]);

  const renderListItem = (price: ListRenderItemInfo<Price>) => {
    const sortedPrices = getSortedPrices();
    // calculate percentage price change
    const currentPrice = price.item.price;
    const previousPrice = sortedPrices[price.index + 1]?.price;
    const priceChange = price.index != (sortedPrices.length - 1) && previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;

    return (
      <PriceChangeListItem
        price={price.item}
        priceChange={priceChange}
        productId={product?.id ?? -1}
      />
    );
  };

  const getSortedPrices = () => {
    const prices = product?.prices.slice();
    // sort prices by date
    const sortedPrices = prices?.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedPrices ?? [];
  };

  return (
    <Layout style={eva.style?.container} level='1'>
      <TopNavigation
        accessoryLeft={
          <TopNavigationBackAction
            title={Strings.EN.Products}
          />
        }
      />
      <View style={eva?.style?.content}>
        {(product?.prices && product?.prices.length > 0) && <List
          ListHeaderComponent={
            () =>
              <ScreenHeader
                title={`${Strings.EN.Overview}: ${product?.name}`}
                subtitle={Strings.EN.Overview_Subtitle}
              />
          }
          ListHeaderComponentStyle={eva.style?.listHeader}
          style={eva.style?.listContainer}
          contentContainerStyle={eva.style?.contentContainer}
          data={getSortedPrices()}
          renderItem={renderListItem}
          ItemSeparatorComponent={Divider}
        />}

        {(!product || product?.prices.length == 0) && <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <NunitoText
            category='h6'
            weight='bold'
          >
            {Strings.EN['No data']}
          </NunitoText>
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
          onPress={product !== undefined ? () => _navigation.navigate('AddPrice', { product: product }) : undefined}
        >
          {Strings.EN.Add_Price.toUpperCase()}
        </Button>
      </View>
    </Layout>
  );
});

const ProductDetails = withStyles(_ProductDetails, theme => ({
  container: {
    flex: 1,
  },
  content: {
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
  }
}));

export default ProductDetails;