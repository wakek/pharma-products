import { Route, useNavigation } from "@react-navigation/native";
import { Button, Datepicker, EvaProp, Icon, Input, Layout, TopNavigation, withStyles } from "@ui-kitten/components";
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
import { AddProductScreenProps } from "../types";

interface AddProductProps {
    route: Route<string>;
    navigation: AddProductScreenProps,
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

const _AddProduct = observer(({ route, navigation, eva }: AddProductProps) => {
    const { productsStore } = useRootStore();
    const _navigation = useNavigation();

    const controlNameInputState = useInputState(
        '',
        (val: string) => {
            setNameInputError(false);
            return val;
        }
    );
    const [nameInputError, setNameInputError] = React.useState(false);
    const controlPriceInputState = useInputState(
        '',
        (val: string) => {
            setPriceInputError(false);
            return currencyFormatter(val);
        }
    );
    const [priceInputError, setPriceInputError] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const currencyFormatter = (value: string) => {
        // format input for decimal currency
        return `${value.replace(/[^\d.-]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }

    const addProduct = () => {
        setNameInputError(false);

        // Check if inputs are empty, if so, show error, otherwise add product
        if (controlNameInputState.value.length === 0) {
            setNameInputError(true);
        } else if (controlPriceInputState.value.length === 0 || parseFloat(controlPriceInputState.value) < 0) {
            setPriceInputError(true);
            return;
        } else {
            // Add product to store
            const product: Product = {
                id: productsStore.getNewProductId(),
                name: controlNameInputState.value,
                prices: [{
                    id: 1,
                    price: parseFloat(controlPriceInputState.value.replace(/,/g, '')),
                    date: date.toISOString(),
                }],
            };

            productsStore.addProduct(product);
            Toast.show(Strings.EN.Product_added_successfully, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM * 2.5,
            });
            _navigation.goBack();
        }

    };

    return (
        <Layout style={eva.style?.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    accessoryLeft={
                        <TopNavigationBackAction
                            title={Strings.EN.Products}
                        />
                    }
                />
                <View style={eva.style?.content}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps='handled'
                    >
                        <ScreenHeader
                            title={Strings.EN.Add_Product}
                            subtitle={Strings.EN.Add_Product_Subtitle}
                        />

                        <Input
                            style={eva.style?.input}
                            label={Strings.EN.Product_Name}
                            placeholder={Strings.EN.Product_Name_Subtitle}
                            accessoryLeft={(props: any) => (
                                <Icon {...props} name='cube-outline' />
                            )}
                            status={nameInputError ? 'danger' : 'basic'}
                            caption={evaProps =>
                                nameInputError ?
                                    <NunitoText
                                        {...evaProps}
                                        weight='regular'
                                    >
                                        {Strings.EN.Enter_a_valid_name}
                                    </NunitoText> :
                                    <></>
                            }
                            {...controlNameInputState}
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
                                        weight='regular'
                                    >
                                        {Strings.EN.Enter_a_valid_price}
                                    </NunitoText> :
                                    <></>
                            }
                            {...controlPriceInputState}
                        />

                        <Datepicker
                            style={eva.style?.input}
                            label={Strings.EN.Price_Date}
                            placeholder={Strings.EN.Price_Date_Subtitle}
                            date={date}
                            onSelect={nextDate => setDate(nextDate)}
                            accessoryRight={(props: any) => (
                                <Icon {...props} name='calendar-outline' />
                            )}
                        />

                        <Button
                            style={eva.style?.button}
                            size='large'
                            onPress={addProduct}
                        >
                            {Strings.EN.Add}
                        </Button>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Layout>
    );
});


const AddProduct = withStyles(_AddProduct, theme => ({
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
}));

export default AddProduct;