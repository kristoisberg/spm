import "core-js/stable";

import { createRoot } from "react-dom/client";

import App from "./app";

const container = document.getElementById("root");
if (container !== null) {
  createRoot(container).render(<App />);
}
