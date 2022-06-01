/**
 * Import all stores.
 */
import { makeAutoObservable } from 'mobx';
import { ProductsStore } from './ProductsStore';

/**
 * RootStore class.
 */
export class RootStore {
    productsStore: ProductsStore;

    constructor() {
        makeAutoObservable(this);
        this.productsStore = new ProductsStore(this);
    }
}
