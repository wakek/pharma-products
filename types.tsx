/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './models/Product';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: undefined;
  ProductDetails: { product: Product };
  AddProduct: undefined;
  UpdateProduct: { product: Product };
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootScreenProps = NativeStackScreenProps<RootStackParamList, "Root">;

export type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export type AddProductScreenProps = NativeStackScreenProps<RootStackParamList, "AddProduct">;

export type UpdateProductScreenProps = NativeStackScreenProps<RootStackParamList, "UpdateProduct">;
