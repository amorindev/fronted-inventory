import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/dashboardPage";
import LoginPage from "./components/loginPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
