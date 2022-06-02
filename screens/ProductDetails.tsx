import { Route } from '@react-navigation/native';
import { Button, Divider, EvaProp, Icon, Layout, List, Text, TopNavigationAction, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import PriceChangeListItem from '../components/PriceChangeListItem';
import { Strings } from '../constants/Strings';
import { Price, Product } from '../models/Product';
import { ProductDetailsScreenProps } from '../types';


interface ProductDetailsProps {
  route: Route<string, { product?: Product }>;
  navigation: ProductDetailsScreenProps,
  eva: EvaProp,
}

const _ProductDetails = observer(({ route, navigation, eva }: ProductDetailsProps) => {
  const product = route?.params?.product;

  const renderListItem = (price: ListRenderItemInfo<Price>) => {
    const sortedPrices = getSortedPrices();
    // calculate percentage price change
    const currentPrice = price.item.price;
    const previousPrice = sortedPrices[price.index + 1]?.price;
    const priceChange = price.index != (sortedPrices.length - 1) && previousPrice ? (currentPrice - previousPrice) / previousPrice : 0;

    return (
      <PriceChangeListItem
        price={price.item}
        priceChange={priceChange}
      />
    );
  };

  const BackAction = () => (
    <TopNavigationAction
      icon={(props) => (
        <Icon {...props} name='arrow-back' />
      )}
    />
  );

  const getSortedPrices = () => {
    const prices = product?.prices;
    return prices?.slice().sort((a, b) => b.price - a.price) ?? [];
  };

  return (
    <Layout style={eva.style?.container}>
      {/* <TopNavigation
        accessoryLeft={BackAction}
        title='Overview'
      /> */}

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
      >
        {Strings.EN.Add.toUpperCase()}
      </Button>
    </Layout>
  );
});

const ProductDetails = withStyles(_ProductDetails, theme => ({
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
  }
}));

export default ProductDetails;