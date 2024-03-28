import { renderWithProviders } from "../../utils/test/test.utils";
import ProductCard from "./product-card.component";
import { fireEvent, screen } from "@testing-library/react";

describe("Product Card tests", () => {
  test("it should add the product item when Product Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "test",
      name: "Item A",
      price: 10,
    };

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      },
    );

    const addToCartElement = screen.getByText(/add to cart/i);

    await fireEvent.click(addToCartElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
