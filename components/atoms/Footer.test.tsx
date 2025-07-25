import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

describe("Convert button behavior", () => {
  it("calls onConvert function when not disabled", () => {
    const onConvert = jest.fn();
    render(<Footer  onConvert={onConvert} disabled={false} />);
    
    const button = screen.getByRole('button', { name: /convert/i });
    expect(button).toBeEnabled();

    // Clicking on the span area since that's where the click handler lives
    fireEvent.click(button.parentElement!); // parent of button here is <span>

    expect(onConvert).toHaveBeenCalled();
  });

  it("does not call onConvert function when disabled", () => {
    const onConvert = jest.fn();
    render(<Footer  onConvert={onConvert} disabled={true} />);

    const button = screen.getByRole('button', { name: /convert/i });
    expect(button).toBeDisabled();

    // Clicking on the span area since that's where the click handler lives
    fireEvent.click(button.parentElement!); // parent of button here is <span>

    expect(onConvert).not.toHaveBeenCalled();
  });
});


describe("Footer component", () => {
  it("renders the footer with the correct elements (specifically the convert button)", () => {
    const onConvert = jest.fn();
    render(<Footer  onConvert={onConvert} disabled={false} />);
    const button = screen.getByRole('button', { name: /convert/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-white cursor");

  });
});

