import {useState} from "react";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "./authserv";

function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   

    function handleresest(e) {
        e.preventDefault();
        if (!validateEmail(email)) {
            alert("Please enter a valid email address ending with @wlv.ac.uk");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
            return;
        }
        alert("Password reset successful!");
    }

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleresest}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <p>Remember your password? 
                <Link to="/login">Login</Link>
            </p>
        </div>  
    );
}

export default ResetPasswordPage;