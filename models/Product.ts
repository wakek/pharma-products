export interface Product {
    id: number;
    name: string;
    prices: Price[];
}

export interface Price {
    id: number;
    price: number;
    date: string;
}
