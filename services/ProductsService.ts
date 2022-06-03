import { ProductsResponse } from "../models/ApiResponses";

const getAllProducts = async (): Promise<ProductsResponse | undefined> => {

    return fetch(
        `https://www.mocky.io/v2/5c3e15e63500006e003e9795`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
        .then(response => {
            return response.json();
        })
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
