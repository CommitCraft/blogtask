import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute"; 
import Blog from "./pages/Blog";
import NewPostForm from "./components/NewPostForm";

function App() {
  const token = localStorage.getItem("token"); 
  const [isReload, setIsReload] = useState(false); 

  
  const handleReload = () => {
    setIsReload((prevState) => !prevState); 
  };

  useEffect(() => {
  }, [isReload]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard handleReload={handleReload} />
            </PrivateRoute>
          }
        />

        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blog handleReload={handleReload} />
            </PrivateRoute>
          }
        />

        <Route
          path="/blog/create"
          element={
            <PrivateRoute>
              <NewPostForm handleReload={handleReload} />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
