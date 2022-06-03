import { Strings } from "../constants/Strings";
import { ProductsResponse } from "../models/ApiResponses";

const getAllProducts = async (): Promise<ProductsResponse | undefined> => {

    return fetch(
        `${Strings.API.BASE_URL}${Strings.API.V2}${Strings.API.PRODUCTS_ENDPOINT}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
        .then(response => response.json())
        .then((productsResponse: ProductsResponse) => {
            return productsResponse;
        })
        .catch(err => {
            return undefined
        });
};

export const ProductsService = {
    getAllProducts,
};
