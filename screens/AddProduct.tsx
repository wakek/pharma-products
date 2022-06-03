import { Route, useNavigation } from "@react-navigation/native";
import { Button, Datepicker, EvaProp, Icon, Input, Layout, Text, TopNavigation, withStyles } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, View } from "react-native";
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
        } else if (controlPriceInputState.value.length === 0) {
            setPriceInputError(true);
            return;
        } else {
            // Add product to store
            const product: Product = {
                id: productsStore.getNewProductId(),
                name: controlNameInputState.value,
                prices: [{
                    id: 1,
                    price: parseFloat(controlPriceInputState.value),
                    date: date.toISOString(),
                }],
            };

            productsStore.addProduct(product);
            _navigation.goBack();
        }

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
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={eva?.style?.header}>
                        <Text style={eva.style?.h6} category='h3' status='primary'>
                            {Strings.EN.Add_Product}
                        </Text>
                        <Text style={eva.style?.subtitle} category='s1' status='basic'>
                            {Strings.EN.Add_Product_Subtitle}
                        </Text>
                    </View>

                    <Input
                        style={eva.style?.input}
                        label={Strings.EN.Product_Name}
                        placeholder={Strings.EN.Product_Name_Subtitle}
                        accessoryLeft={(props: any) => (
                            <Icon {...props} name='cube-outline' />
                        )}
                        status={nameInputError ? 'danger' : 'basic'}
                        caption={evaProps =>
                            nameInputError ? <Text {...evaProps}>
                                {Strings.EN.Enter_a_valid_name}
                            </Text> : <></>
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
                            priceInputError ? <Text {...evaProps}>
                                {Strings.EN.Enter_a_valid_price}
                            </Text> : <></>
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
            </Layout>
        </>
    );
});


const AddProduct = withStyles(_AddProduct, theme => ({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
    header: {
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