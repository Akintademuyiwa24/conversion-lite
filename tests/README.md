# Testing Setup

This project is configured with Jest and React Testing Library for comprehensive testing.

## Available Test Scripts

```bash
# Run all tests once
npm test

# Run tests in watch mode (reruns tests when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- **Unit Tests**: Located in `tests/` directory
- **Component Tests**: Located in `tests/components/`
- **Test Utilities**: Located in `tests/utils/`

## Configuration Files

- `jest.config.js`: Main Jest configuration
- `jest.setup.js`: Global test setup and Jest DOM matchers
- `types/jest.d.ts`: TypeScript declarations for Jest DOM matchers

## Writing Tests

### Component Testing Example

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles user interactions", () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Available Matchers

- `toBeInTheDocument()`
- `toHaveClass(className)`
- `toHaveTextContent(text)`
- `toBeVisible()`
- `toBeDisabled()`
- `toBeEnabled()`
- `toHaveAttribute(attr, value)`
- `toHaveValue(value)`

## Best Practices

1. **Test Structure**: Follow the AAA pattern (Arrange, Act, Assert)
2. **Descriptive Names**: Use descriptive test names that explain what is being tested
3. **User-Centric**: Test from a user's perspective using accessible queries
4. **Mock External Dependencies**: Mock API calls, external libraries, etc.
5. **Clean Up**: Use cleanup utilities when needed

## Coverage

Jest is configured to collect coverage from:

- `app/**/*.{js,jsx,ts,tsx}`
- `components/**/*.{js,jsx,ts,tsx}`
- `utils/**/*.{js,jsx,ts,tsx}`

Run `npm run test:coverage` to see coverage reports.
