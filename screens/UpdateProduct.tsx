import { Route, useNavigation } from "@react-navigation/native";
import { Button, EvaProp, Icon, Input, Layout, Text, TopNavigation, withStyles } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, View } from "react-native";
import TopNavigationBackAction from "../components/TopNavigationBackAction";
import { Strings } from "../constants/Strings";
import { useRootStore } from "../hooks/useRootStore";
import { Product } from "../models/Product";
import { UpdateProductScreenProps } from "../types";

interface UpdateProductProps {
    route: Route<string, { product: Product }>;
    navigation: UpdateProductScreenProps,
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

const _UpdateProduct = observer(({ route, navigation, eva }: UpdateProductProps) => {
    const product = route?.params?.product;
    const { productsStore } = useRootStore();
    const _navigation = useNavigation();

    const controlNameInputState = useInputState(
        product.name,
        (val: string) => {
            setNameInputError(false);
            return val
        }
    );
    const [nameInputError, setNameInputError] = React.useState(false);


    const updateProduct = () => {
        setNameInputError(false);

        // Check if inputs are empty, if so, show error, otherwise update product
        if (controlNameInputState.value.length === 0) {
            setNameInputError(true);
        } else {
            const updatedProduct: Product = {
                ...product,
                name: controlNameInputState.value,
            };

            productsStore.updateProduct(updatedProduct);
            _navigation.goBack();
        }

    };

    return (
        <Layout style={eva.style?.container}>
            <TopNavigation
                accessoryLeft={
                    <TopNavigationBackAction
                        title={Strings.EN.Products}
                    />
                }
            />
            <View style={eva?.style?.content}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={eva?.style?.header}>
                        <Text style={eva.style?.h6} category='h3' status='primary'>
                            {Strings.EN.Update_Product}
                        </Text>
                        <Text style={eva.style?.subtitle} category='s1' status='basic'>
                            {Strings.EN.Update_Product_Subtitle}
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

                    <Button
                        style={eva.style?.button}
                        size='large'
                        onPress={updateProduct}
                    >
                        {Strings.EN.Update}
                    </Button>
                </ScrollView>
            </View>
        </Layout>
    );
});


const UpdateProduct = withStyles(_UpdateProduct, theme => ({
    container: {
        flex: 1,
    },
    content: {
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

export default UpdateProduct;