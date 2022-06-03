import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { makeAutoObservable } from 'mobx';
import { Strings } from '../../constants/Strings';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/ProductsService';
import { RootStore } from './RootStore';

export class ProductsStore {
    rootStore: RootStore;
    products: Product[];
    isLoading: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.products = [];
        this.isLoading = true;

        Network.getNetworkStateAsync()
            .then(networkState => {
                if (networkState.isConnected) this.loadProducts();
                else this.loadStoredProducts();
            })
            .catch(err => {
                this.setProducts([]);
                this.setIsLoading(false);
            });
        makeAutoObservable(this);
    }

    async loadProducts() {
        this.setIsLoading(true);
        ProductsService.getAllProducts()
            .then(productsResponse => {
                if (
                    productsResponse
                ) {
                    this.setProducts(productsResponse.products);
                }
            })
            .catch(err => {
                this.setProducts([]);
                console.log(err);

            })
            .finally(() => this.setIsLoading(false));
    }

    async loadStoredProducts(delay: number = 0) {
        this.setIsLoading(true);
        AsyncStorage.getItem(Strings.STORAGE_KEYS.Products_key)
            .then(productsStringified => {
                this.setProducts(
                    productsStringified ? JSON.parse(productsStringified) : [],
                );
            })
            .catch(err => this.setProducts([]))
            .finally(() => setTimeout(() => this.setIsLoading(false), delay));
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.setProducts(this.products);
    }

    updateProduct(product: Product) {
        const _products = this.products.map(
            _product => (_product.id === product.id ? product : _product),
        );
        this.setProducts(_products);
    }

    removeProduct(product: Product) {
        const _products = this.products.filter(
            _product => _product.id !== product.id,
        );
        this.setProducts(_products);
    }

    addPrice(price: number, product: Product, date?: Date) {
        const _products = this.products.map(
            (_product: Product) => (_product.id === product.id
                ? {
                    ..._product,
                    prices: _product.prices.concat([
                        {
                            id: this.getNewPriceId(product),
                            price: price,
                            date: (date ?? new Date()).toISOString(),
                        }
                    ]),
                }
                : _product),
        );
        this.setProducts(_products);
    }

    getProductById(id: number) {
        return this.products.find(_product => _product.id === id);
    }

    private setIsLoading(_isLoading: boolean) {
        this.isLoading = _isLoading;
    }

    setProducts(products: Product[]) {
        this.products = products;
        AsyncStorage.setItem(
            Strings.STORAGE_KEYS.Products_key,
            JSON.stringify(this.products),
        );
    }

    getNewProductId() {
        const maxId = Math.max(...this.products.map(product => product.id));
        return maxId + 1;
    }

    getNewPriceId(product: Product) {
        const maxId = Math.max(...product.prices.map(price => price.id));
        return maxId + 1;
    }

    get getProducts() {
        return this.products;
    }

    get getIsLoading() {
        return this.isLoading;
    }

    clearStore() {
        return this.setProducts([]);
    }
}
