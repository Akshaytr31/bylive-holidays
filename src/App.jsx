import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Downlines from "./pages/Downlines";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/downlines"
          element={
            <ProtectedRoute>
              <Downlines />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
