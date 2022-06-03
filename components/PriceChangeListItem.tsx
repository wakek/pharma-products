import { Card, Divider, EvaProp, Icon, Modal, Text, useTheme, withStyles } from "@ui-kitten/components";
import React from "react";
import { Animated, I18nManager, TouchableOpacity, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Strings } from "../constants/Strings";
import { useRootStore } from "../hooks/useRootStore";
import { Price, Product } from "../models/Product";

export interface PriceChangeListItemProps {
    price: Price,
    priceChange: number,
    product: Product,
    eva?: EvaProp,
}

const _PriceChangeListItem = ({ price, priceChange, product, eva }: PriceChangeListItemProps) => {
    const { productsStore } = useRootStore();
    const theme = useTheme();
    const [visibleModal, setVisibleModal] = React.useState(false);
    const swipeableRef = React.useRef<Swipeable>(null);

    const getPriceDate = (): string => {
        // return date as MMM DD, YYYY
        return (new Date(price.date)).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const renderActions = (
        progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={eva?.style?.rightAction} onPress={deletePrice}>
                <Icon
                    name="trash-2-outline"
                    size={30}
                    fill="#fff"
                    style={[eva?.style?.actionIcon, eva?.style?.rightActionIcon]}
                />
            </RectButton>
        );
    };

    const deletePrice = () => {
        productsStore.removePrice(price.id, product);
    }

    return (
        <>
            <Swipeable
                ref={swipeableRef}
                friction={3}
                leftThreshold={80}
                rightThreshold={41}
                renderLeftActions={renderActions}
                renderRightActions={renderActions}
                onSwipeableLeftOpen={deletePrice}
                onSwipeableRightOpen={deletePrice}
            >
                <TouchableOpacity onPress={() => setVisibleModal(true)} activeOpacity={0.7}>
                    <View style={eva?.style?.card}>
                        <View style={eva?.style?.titleRow}>
                            <View style={eva?.style?.productIconContainer}>
                                <Icon
                                    style={eva?.style?.productIcon}
                                    fill={theme['text-basic-color']}
                                    name={priceChange > 0 ? 'chevron-up-outline' : 'chevron-down-outline'}
                                />
                            </View>

                            <Text style={eva?.style?.title} category='s1' status='basic'>
                                GHC {price.price.toFixed(2)}
                            </Text>
                        </View>
                        <View style={eva?.style?.badgeRow}>
                            <View style={[eva?.style?.bagde, eva?.style?.dateTimeBagde]}>
                                <Icon
                                    style={eva?.style?.badgeIcon}
                                    fill={theme['text-basic-color']}
                                    name='clock-outline'
                                />
                                <Text style={eva?.style?.badgeText} category='s2' status='basic'>
                                    {getPriceDate()}
                                </Text>
                            </View>

                            <View
                                style={[
                                    eva?.style?.bagde, eva?.style?.percentageBadge,
                                    {
                                        backgroundColor: priceChange >= 0 ? theme['color-success-200'] : theme['color-danger-200'],
                                    }
                                ]}
                            >
                                <Icon
                                    style={eva?.style?.badgeIcon}
                                    fill={priceChange >= 0 ? theme['color-success-600'] : theme['color-danger-600']}
                                    name='percent-outline'
                                />
                                <Text style={eva?.style?.badgeText} category='s2' status='basic'>
                                    {priceChange > 0 ? '+' : '-'}{Math.abs(priceChange).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
            </Swipeable>

            <Modal
                visible={visibleModal}
                backdropStyle={eva?.style?.backdrop}
                onBackdropPress={() => setVisibleModal(false)}>
                <Card disabled={true}>
                    <View style={eva?.style?.detailsRow}>
                        <Text style={eva?.style?.detailsText} category='s1'>
                            {Strings.EN.Price}
                        </Text>
                        <Text style={eva?.style?.detailsValue} category='s1'>
                            {price.price}
                        </Text>
                    </View>
                    <Divider />
                    <View style={eva?.style?.detailsRow}>
                        <Text style={eva?.style?.detailsText} category='s1'>
                            {Strings.EN.Percentage_change}
                        </Text>
                        <Text style={eva?.style?.detailsValue} category='s1'>
                            {priceChange > 0 ? '+' : '-'}{Math.abs(priceChange).toFixed(2)}
                        </Text>
                    </View>
                    <Divider />
                    <View style={eva?.style?.detailsRow}>
                        <Text style={eva?.style?.detailsText} category='s1'>
                            {Strings.EN.Date_created}
                        </Text>
                        <Text style={eva?.style?.detailsValue} category='s1'>
                            {getPriceDate()}
                        </Text>
                    </View>
                </Card>
            </Modal>
        </>
    );
}

const PriceChangeListItem = withStyles(_PriceChangeListItem, theme => ({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        backgroundColor: theme['background-basic-color-1'],
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    dateTimeBagde: {
        backgroundColor: '#FBFFD2',
    },
    percentageBadge: {
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
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
    },
    detailsValue: {
        fontFamily: 'Nunito-Bold',
        fontSize: 14,
    },
}));

export default PriceChangeListItem;