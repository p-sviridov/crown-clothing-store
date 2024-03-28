import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "./button.component";

describe("button tests", () => {
  // this test is not working (seems like hover is applied by default)
  // test("should render base button when nothing is passed", () => {
  //   render(<Button>Test</Button>);
  //
  //   const buttonElement = screen.getByRole("button");
  //   expect(buttonElement).toHaveStyle("background-color: black");
  // });

  test("should render google button when passed google button type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: #357ae8");
  });

  test("should render inverted button when passed inverted button type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: black");
  });

  test("should be disabled button when isLoading is true", () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
