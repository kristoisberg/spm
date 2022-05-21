import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import AddClientPage from "./pages/add-client";
import EditClientPage from "./pages/edit-client";

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clients/add" element={<AddClientPage />} />
      <Route path="/clients/:clientId" element={<EditClientPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
