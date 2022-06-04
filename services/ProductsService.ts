import { Strings } from "../constants/Strings";
import { ProductsResponse } from "../models/ApiResponses";

class ProductsService {
    public async getAllProducts(): Promise<ProductsResponse | undefined> {
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
}

export default new ProductsService();
