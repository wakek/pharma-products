import { useNavigation } from "@react-navigation/native";
import { EvaProp, Icon, Text, useTheme, withStyles } from "@ui-kitten/components";
import React from "react";
import { Animated, I18nManager, TouchableOpacity, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Strings } from "../constants/Strings";
import { useRootStore } from "../hooks/useRootStore";
import { Product } from "../models/Product";

export interface ProductListItemProps {
    product: Product,
    eva?: EvaProp,
}

const _ProductListItem = ({ product, eva }: ProductListItemProps) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { productsStore } = useRootStore();
    const swipeableRef = React.useRef<Swipeable>(null);

    const getLatestPriceDate = (): string => {
        // get latest date from list of strings in product.prices
        const latestPriceDate = product.prices.reduce((latestDate, price) => {
            const date = new Date(price.date);
            if (date > latestDate) {
                return date;
            }
            return latestDate;
        }, new Date(0));

        // return date as MMM DD, YYYY
        return product.prices.length === 0 ? Strings.EN.N_A : latestPriceDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getLatestPrice = (): string => {
        // get latest price from list of strings in product.prices
        const latestPrice = product.prices.reduce((_latestPrice, price) => {
            const priceNum = parseFloat(price.price.toLocaleString());
            if (priceNum > _latestPrice) {
                return priceNum;
            }
            return _latestPrice;
        }, 0);

        // return price as $###.##
        return latestPrice.toFixed(2);
    };

    const openDetails = () => {
        navigation.navigate('ProductDetails', { product });
    }

    const renderLeftActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const _scale = dragX.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={eva?.style?.leftAction} onPress={updateProduct}>
                <Icon
                    name="edit-outline"
                    size={30}
                    fill="#fff"
                    style={[eva?.style?.actionIcon, eva?.style?.leftActionIcon]}
                />
            </RectButton>
        );
    };

    const renderRightActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const _scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={eva?.style?.rightAction} onPress={deleteProduct}>
                <Icon
                    name="trash-2-outline"
                    size={30}
                    fill="#fff"
                    style={[eva?.style?.actionIcon, eva?.style?.rightActionIcon]}
                />
            </RectButton>
        );
    };

    const updateProduct = () => {
        navigation.navigate('UpdateProduct', { product });
        swipeableRef.current?.close();
    }

    const deleteProduct = () => {
        productsStore.removeProduct(product);
        swipeableRef.current?.close();
    };

    return (
        <Swipeable
            ref={swipeableRef}
            friction={3}
            leftThreshold={80}
            rightThreshold={41}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={updateProduct}
            onSwipeableRightOpen={deleteProduct}
        >
            <TouchableOpacity onPress={openDetails} activeOpacity={0.7}>
                <View style={eva?.style?.card}>
                    <View style={eva?.style?.titleRow}>
                        <View style={eva?.style?.productIconContainer}>
                            <Icon
                                style={eva?.style?.productIcon}
                                fill={theme['text-basic-color']}
                                name='cube-outline'
                            />
                        </View>

                        <Text style={eva?.style?.title} category='s1' status='basic'>
                            {product.name}
                        </Text>
                    </View>
                    <View style={eva?.style?.badgeRow}>
                        <View style={[eva?.style?.bagde, eva?.style?.priceBagde]}>
                            <Icon
                                style={eva?.style?.badgeIcon}
                                fill={theme['text-basic-color']}
                                name='pricetags-outline'
                            />
                            <Text style={eva?.style?.badgeText} category='s2' status='basic'>
                                GHC {getLatestPrice()}
                            </Text>
                        </View>

                        <View style={[eva?.style?.bagde, eva?.style?.dateBagde]}>
                            <Icon
                                style={eva?.style?.badgeIcon}
                                fill={theme['text-basic-color']}
                                name='calendar-outline'
                            />
                            <Text style={eva?.style?.badgeText} category='s2' status='basic'>
                                {getLatestPriceDate()}
                            </Text>
                        </View>

                        <View style={[eva?.style?.bagde, eva?.style?.editsBagde]}>
                            <Icon
                                style={eva?.style?.badgeIcon}
                                fill={theme['text-basic-color']}
                                name='bar-chart-outline'
                            />
                            <Text style={eva?.style?.badgeText} category='s2' status='basic'>
                                {product.prices.length}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const ProductListItem = withStyles(_ProductListItem, theme => ({
    card: {
        backgroundColor: theme['background-basic-color-1'],
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    productIcon: {
        padding: 5,
        height: 20,
        width: 20,
    },
    productIconContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
    },
    titleRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
        marginLeft: 10,
    },
    badgeRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12,
    },
    bagde: {
        backgroundColor: '#FBFFD2',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginEnd: 10,
    },
    priceBagde: {
        backgroundColor: '#FFD1C2',
    },
    dateBagde: {
        backgroundColor: '#FBFFD2',
    },
    editsBagde: {
        backgroundColor: '#E3F3FE',
    },
    badgeIcon: {
        height: 15,
        width: 15,
        marginRight: 5,
        opacity: 0.6,
    },
    badgeText: {
        opacity: 0.6,
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
    },

    leftAction: {
        flex: 1,
        backgroundColor: '#388e3c',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'flex-end'
    },
    actionIcon: {
        height: 30,
        width: 30,
    },
    leftActionIcon: {
        marginLeft: 30,
    },
    rightActionIcon: {
        marginRight: 30,
    },
}));

export default ProductListItem;