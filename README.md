
# Simple Calculator

A web-based calculator built with HTML, CSS, JavaScript, and Bootstrap 5. This calculator supports basic arithmetic operations and handles decimal points. It's designed to be simple, yet functional for everyday calculations.



## Features

- Addition, subtraction, multiplication, and division operations.
- Support for decimal points.
- Error handling for invalid inputs and operations.
- Responsive design using Bootstrap 5.


## Getting Started

#### Prerequisites
- Node.js (for running tests and development tools)
- npm (Node package manager)


### Installation

1. Clone the repository:

```bash
  git clone https://github.com/nc-naylor/simple-calculator.git
```

2. Navigate to the project directory
```bash
  cd simple-calculator
```

3. Install the dependencies
```bash
  npm install
```
## Usage

1. Run the application
  Open `index.html` in your web browser to start using the calculator.

2. Run tests:
  To run unit tests, use:
```bash
  npm test
```
## Testing
**Unit Tests**: Written using Jest to ensure the functionality of the calculator. The tests cover various aspects of the calculator logic, including tokenization, infix to postfix conversion, evaluation of postfix expressions, and handling of operators and decimal points.
## Project Structure

- `index.html` - Main HTML file for the calculator UI.
- `styles.css` - CSS styles for the calculator.
- `index.js` - JavaScript logic for the calculator.
- `calculator.js` - JavaScript functions for calculation logic.
- `__tests__/` - Directory containing Jest unit tests.


## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
