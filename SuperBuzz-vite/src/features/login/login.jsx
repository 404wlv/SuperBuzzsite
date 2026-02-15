import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./authserv";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address ending with @wlv.ac.uk");
            return;
        } 

        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
            return;
        }

        // Simulate successful login
        alert("Login successful!");
        navigate("/home");
    };

    return (        
        <div className="login-container">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>          
                <div className="form-group">            
                    <label>Email:</label>         
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>          
                    </div>          
                    
                    <div className="form-group">            
                        <label>Password:</label>         
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>         
                    </div>          
                    <button type="submit">Login</button>        
            </form>        
            
            <p>
                <Link to="/reset-password">Forgot password?</Link>
            </p>


            <p>Don't have an account? 
                <Link to="/signup">Sign up</Link>
            </p>      
        </div>
        );
}    
export default Login;  