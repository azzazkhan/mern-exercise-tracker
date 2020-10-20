import React from "react"; // Support for JSX syntax
import ReactDOM from "react-dom"; // For rendering React Components on DOM
import App from "./App"; // Load base component

/**
 * React `StrictMode` is a helper component which helps writing better react
 * components.
 * It helps in:
 * 1. Identifying components with unsafe lifecycles
 * 2. Warning about legacy string ref API usage
 * 3. Warning about deprecated `findDOMNode` usage
 * 4. Detecting unexpected side effects
 * 5. Detecting legacy context API
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"), // Render the component in (#root) element
);
