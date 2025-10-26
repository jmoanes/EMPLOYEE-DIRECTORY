import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeDirectory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
