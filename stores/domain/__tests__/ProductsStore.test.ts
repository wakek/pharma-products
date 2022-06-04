import { RootStore } from "../RootStore";
jest.mock("../../../services/ProductsService");

describe("ProductsStore", () => {
  it("loads products", async () => {
    const rootStore = new RootStore();
    const store = rootStore.productsStore;
    expect(store.getProducts.length).toBe(0);
    expect(store.getIsLoading).toBe(true);

    const loadProducts = spyOn(store, "loadProducts");
    await store.loadProducts();
    expect(loadProducts).toBeCalledTimes(1);

    await new Promise(process.nextTick);
    expect(store.getIsLoading).toBe(false);
    // expect(store.getProducts.length).toBe(3);
  });
})