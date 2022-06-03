import { Route, useNavigation } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, Layout, List, Text, TopNavigation, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import PriceChangeListItem from '../components/PriceChangeListItem';
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
        product={product!}
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
    <>
      <TopNavigation
        accessoryLeft={
          <TopNavigationBackAction
            title={Strings.EN.Products}
          />
        }
      />
      <Layout style={eva.style?.container}>

        {(product?.prices && product?.prices.length > 0) && <List
          ListHeaderComponent={
            () => <>
              <Text style={eva.style?.h6} category='h3' status='primary'>
                {Strings.EN.Overview}: {product?.name}
              </Text>
              <Text style={eva.style?.subtitle} category='s1' status='basic'>
                {Strings.EN.Overview_Subtitle}
              </Text>
            </>
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
          onPress={product !== undefined ? () => _navigation.navigate('AddPrice', { product: product }) : undefined}
        >
          {Strings.EN.Add_Price.toUpperCase()}
        </Button>
      </Layout>
    </>
  );
});

const ProductDetails = withStyles(_ProductDetails, theme => ({
  container: {
    flex: 1,
  },
  h6: {
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  }
}));

export default ProductDetails;