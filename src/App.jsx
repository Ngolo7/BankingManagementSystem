import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage"; // Corrected the casing of the file name

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
