import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/login/login.jsx";
import Signup from "../features/login/signup.jsx";
import Home from "../features/home.jsx";
import ResetPasswordPage from "../features/login/resetpassword.jsx";


function App() {
    return (
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
    );
}

export default App;