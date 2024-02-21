import Home from "./pages/Home";
import QrGeneratorPage from "./pages/QrGeneratorPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/qrcode" element={<QrGeneratorPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
