import { Route, useNavigation } from "@react-navigation/native";
import { Button, Datepicker, EvaProp, Icon, Input, Layout, Toggle, TopNavigation, withStyles } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Toast from 'react-native-root-toast';
import ScreenHeader from "../components/ScreenHeader";
import { NunitoText } from "../components/StyledText";
import TopNavigationBackAction from "../components/TopNavigationBackAction";
import { Strings } from "../constants/Strings";
import { useRootStore } from "../hooks/useRootStore";
import { Product } from "../models/Product";
import { AddPriceScreenProps } from "../types";

interface AddPriceProps {
    route: Route<string, { product: Product }>;
    navigation: AddPriceScreenProps,
    eva: EvaProp,
}

const useInputState = (initialValue = '', formatter = (val: string) => val) => {
    const [value, setValue] = React.useState(initialValue);
    return {
        value, onChangeText: (val: string) => {
            setValue(formatter(val));
        }
    };
};

const _AddPrice = observer(({ route, navigation, eva }: AddPriceProps) => {
    const { productsStore } = useRootStore();
    const product = route.params.product;
    const _navigation = useNavigation();

    const controlPriceInputState = useInputState(
        '',
        (val: string) => {
            setPriceInputError(false);
            return currencyFormatter(val);
        }
    );
    const [priceInputError, setPriceInputError] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const [isNewPrice, setIsNewPrice] = React.useState(true);

    const onCheckedChange = (isChecked: boolean) => {
        setIsNewPrice(isChecked);
    };

    const currencyFormatter = (value: string) => {
        // format input for decimal currency
        return `${value.replace(/[^\d.-]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }

    const addPrice = () => {
        setPriceInputError(false);

        // Check if inputs are empty, if so, show error, otherwise add price
        if (controlPriceInputState.value.length === 0) {
            setPriceInputError(true);
        } else {
            productsStore.addPrice(
                parseFloat(controlPriceInputState.value.replace(/,/g, '')),
                product,
                isNewPrice ? undefined : date,
            );
            Toast.show(Strings.EN.Price_added_successfully, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM * 2.5,
            });
            _navigation.goBack();
        }
    };

    return (
        <Layout style={eva.style?.container} level='1'>
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    accessoryLeft={
                        <TopNavigationBackAction
                            title={Strings.EN.Overview}
                        />
                    }
                />
                <View style={eva?.style?.content}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps='handled'
                    >
                        <ScreenHeader
                            title={Strings.EN.Add_Price}
                            subtitle={`${Strings.EN.Add_Price_Subtitle} ${product.name}`}
                        />

                        <Input
                            style={eva.style?.input}
                            label={Strings.EN.Product_Price}
                            placeholder={Strings.EN.Product_Price_Subtitle}
                            accessoryLeft={(props: any) => (
                                <Icon {...props} name='pricetags-outline' />
                            )}
                            status={priceInputError ? 'danger' : 'basic'}
                            caption={evaProps =>
                                priceInputError ?
                                    <NunitoText
                                        {...evaProps}
                                        weight="regular"
                                    >
                                        {Strings.EN.Enter_a_valid_price}
                                    </NunitoText> :
                                    <></>
                            }
                            {...controlPriceInputState}
                        />

                        <View style={eva?.style?.toggleContainer}>
                            <Toggle
                                status='info'
                                checked={isNewPrice}
                                onChange={onCheckedChange}
                            >
                                {Strings.EN.New_price.toLocaleUpperCase()}
                            </Toggle>
                        </View>

                        {!isNewPrice && <Datepicker
                            style={eva.style?.input}
                            label={Strings.EN.Price_Date}
                            placeholder={Strings.EN.Price_Date_Subtitle}
                            date={date}
                            onSelect={nextDate => setDate(nextDate)}
                            disabled={isNewPrice}
                            accessoryRight={(props: any) => (
                                <Icon {...props} name='calendar-outline' />
                            )}
                        />}

                        <Button
                            style={eva.style?.button}
                            size='large'
                            onPress={addPrice}
                        >
                            {Strings.EN.Add}
                        </Button>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Layout>
    );
});


const AddPrice = withStyles(_AddPrice, theme => ({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        // borderRadius: 100,
        marginTop: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    }
}));

export default AddPrice;