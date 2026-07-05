import { OrderService } from "../src/order.service";
describe("OrderService", () => {
  it("should calculate total correctly", () => {
    const service = new OrderService();
    expect(service.calculateTotal(100, 20)).toBe(120);
  });
});