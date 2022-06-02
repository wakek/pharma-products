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

        ProductsService.getAllProducts()
            .then(productsResponse => {
                if (
                    productsResponse
                ) {
                    this.setProducts(productsResponse.products);
                }
            })
            .finally(() => this.setIsLoading(false));
    }

    async loadStoredProducts() {
        AsyncStorage.getItem(Strings.STORAGE_KEYS.Products_key)
            .then(productsStringified => {
                this.setProducts(
                    productsStringified ? JSON.parse(productsStringified) : [],
                );
            })
            .catch(err => this.setProducts([]))
            .finally(() => this.setIsLoading(false));
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
