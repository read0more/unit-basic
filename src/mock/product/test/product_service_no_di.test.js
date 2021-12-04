const ProductService = require("../product_service_no_di.js");
const ProductClient = require("../product_client.js");
jest.mock("../product_client");

describe("product service", () => {
  const fetchItems = jest.fn(async () => [
    { item: "Milk", available: true },
    { item: "Banana", available: false },
  ]);

  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });
  let productService;

  beforeEach(() => {
    productService = new ProductService();
    // clearMocks를 true로 하지 않았다면 아래처럼 수동으로 초기화 필요
    // fetchItems.mockClear();
    // ProductClient.mockClear();
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toEqual(1);
    expect(items).toEqual([{ item: "Milk", available: true }]);
  });

  it("test", async () => {
    const items = await productService.fetchAvailableItems();

    // jest 설정에서 clearMocks를 true로 하거나 않았다면 위의 it에서도 호출했기 때문에 2번 호출했다고 나옴
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
