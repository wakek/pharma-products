import { Card, Divider, EvaProp, Icon, Modal, useTheme, withStyles } from "@ui-kitten/components";
import React from "react";
import { Animated, I18nManager, TouchableOpacity, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Strings } from "../constants/Strings";
import { useRootStore } from "../hooks/useRootStore";
import { Price } from "../models/Product";
import { NunitoText } from "./StyledText";

export interface PriceChangeListItemProps {
    price: Price,
    priceChange: number,
    productId: number,
    eva?: EvaProp,
}

const _PriceChangeListItem = ({ price, priceChange, productId, eva }: PriceChangeListItemProps) => {
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
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const _scale = dragX.interpolate({
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
        productsStore.removePrice(price.id, productId);
        swipeableRef.current?.close();
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

                            <NunitoText
                                style={eva?.style?.title}
                                category='h5'
                                status='basic'
                                weight="bold"
                            >
                                GHC {price.price.toFixed(2)}
                            </NunitoText>
                        </View>
                        <View style={eva?.style?.badgeRow}>
                            <View style={[eva?.style?.bagde, eva?.style?.dateTimeBagde]}>
                                <Icon
                                    style={eva?.style?.badgeIcon}
                                    fill='#000'
                                    name='clock-outline'
                                />
                                <NunitoText
                                    style={eva?.style?.badgeText}
                                    category='s2'
                                    status='basic'
                                    weight="regular"
                                >
                                    {getPriceDate()}
                                </NunitoText>
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
                                    fill='#000'
                                    name='percent-outline'
                                />
                                <NunitoText
                                    style={eva?.style?.badgeText}
                                    category='s2'
                                    status='basic'
                                >
                                    {priceChange > 0 ? '+' : '-'}{Math.abs(priceChange).toFixed(2)}
                                </NunitoText>
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
                        <NunitoText
                            style={eva?.style?.detailsText}
                            category='s1'
                            weight='regular'
                        >
                            {Strings.EN.Price}
                        </NunitoText>
                        <NunitoText
                            style={eva?.style?.detailsValue}
                            category='s1'
                            weight='bold'
                        >
                            {price.price}
                        </NunitoText>
                    </View>
                    <Divider />
                    <View style={eva?.style?.detailsRow}>
                        <NunitoText
                            style={eva?.style?.detailsText}
                            category='s1'
                            weight='regular'
                        >
                            {Strings.EN.Percentage_change}
                        </NunitoText>
                        <NunitoText
                            style={eva?.style?.detailsValue}
                            category='s1'
                            weight='bold'
                        >
                            ({priceChange > 0 ? '+' : '-'})%{Math.abs(priceChange).toFixed(2)}
                        </NunitoText>
                    </View>
                    <Divider />
                    <View style={eva?.style?.detailsRow}>
                        <NunitoText
                            style={eva?.style?.detailsText}
                            category='s1'
                            weight='regular'
                        >
                            {Strings.EN.Date_created}
                        </NunitoText>
                        <NunitoText
                            style={eva?.style?.detailsValue}
                            category='s1'
                            weight='bold'
                        >
                            {getPriceDate()}
                        </NunitoText>
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
        color: '#000',
        opacity: 0.6,
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
        marginRight: 20,
    },
    detailsValue: {
        marginVertical: 5,
    },
}));

export default PriceChangeListItem;