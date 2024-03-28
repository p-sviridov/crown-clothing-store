import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";

import Navigation from "./navigation.component";
import { renderWithProviders } from "../../utils/test/test.utils";
import * as userAction from "../../store/user/user.action";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Navigation tests", () => {
  const useDispatchMock = reactRedux.useDispatch;
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
  });
  afterEach(() => {
    useDispatchMock.mockClear();
  });

  test("it should render a Sign in link and not Sign Out if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signInElement = screen.getByText(/sign in/i);
    expect(signInElement).toBeInTheDocument();

    const signOutElement = screen.queryByText(/sign out/i);
    expect(signOutElement).toBeNull();
  });

  test("it should render a Sign Out and no Sign In if there i currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signOutElement = screen.getByText(/sign out/i);
    expect(signOutElement).toBeInTheDocument();

    const signInElement = screen.queryByText(/sign in/i);
    expect(signInElement).toBeNull();
  });

  test("should not render a Cart Dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    const DropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(DropdownTextElement).toBeNull();
  });

  test("should render a Cart Dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    const DropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(DropdownTextElement).toBeInTheDocument();
  });

  test("it should dispatch signOutStart action when clicking in the Sign Out link", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    //Spy signOutStart
    const signOutStartAction = jest.spyOn(userAction, "signOutStart");
    expect(signOutLinkElement).toBeInTheDocument();
    fireEvent.click(signOutLinkElement);
    expect(useDispatchMock).toHaveBeenCalled();
    expect(signOutStartAction).toHaveBeenCalled();
  });
});
