import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/events"
                    element={
                        <ProtectedRoute>
                            <Events />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-registrations"
                    element={
                        <ProtectedRoute>
                            <MyRegistrations />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;