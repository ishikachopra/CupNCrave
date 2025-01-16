import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
//     EXPLANATION

//     The user types "John" in the name input.

//     e.target.name = "name"
//     e.target.value = "John"
//     setFormData updates the state to:
//     formData = { name: "John" }

//     the user types "john@example.com" in the email input.
//     e.target.name = "email"
//     e.target.value = "john@example.com"
//     setFormData updates the state to:
//     formData = { name: "John", email: "john@example.com" }

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password , number, address, gender, dob} = formData;
        console.log('abc');
        if (!name || !email || !password || !number || !address || !gender || !dob) {
            setMessage("All fields are required for registration.");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const validateName = (name) =>
            /^[a-zA-Z\s]+$/.test(name.trim()) &&
            name.trim().length > 0 &&
            name.trim().length <= 20;

        const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);

        const validateEmailFormat = (email) =>
            /^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|chitkara\.edu\.in)$/.test(
                email
            );

        const validateDateOfBirth = (dob) => {
            const today = new Date();
            const birthDate = new Date(dob);

            let age = today.getFullYear() - birthDate.getFullYear();

            // Get the difference in months and days
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            // If the birthday hasn't occurred yet this year, subtract 1 from the age
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            // Now check if the age is between 10 and 95
            return age >= 10 && age <= 95;
        };

        
        if (!validateName(name)) {
            setMessage("Name must contain only letters and be 1-20 characters long.");  
            return; 
        }

        if(!validateEmailFormat(email)){
            setMessage("Invalid Email address");
        }

        if (!validatePhoneNumber(number)) {
            setMessage("Invalid Mobile number.");
            return;
        }

        if (!validateDateOfBirth(dob)) {
            setMessage("You must be 10-90 years old.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/CupnCrave/signup', formData);
            console.log(formData);
            if (response.status === 201) {
                setMessage("Registration successful! Please login.");
                setFormData({});
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="lcontainer">
                <div className="lrow srow">
                    <img src="./images/loginimg.png" alt='' />
                    <div className="signup-container">
                        <h2>Sign Up</h2>
                        {message && <p>{message}</p>}
                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={formData.name || ""}    // doesnt need to be done but just good practice
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="confirmPassword"  // New field for confirm password
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}  // Update confirmPassword state
                            />
                            <input
                                type="tel"
                                name="number"
                                placeholder="Phone Number"
                                value={formData.number || ""}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address || ""}
                                onChange={handleChange}
                            />
                            <input 
                                type="date"
                                name="dob"
                                value={formData.dob || ""}
                                onChange={handleChange}
                            />
                            
                            
                            <div className="gender-selection">
                                
                                <select
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                           
                           
                            <button type="submit" className="loginbtn">Register</button>
                        </form>
                        <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

















// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// function Signup() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const handleRegister = (e) => {
//         e.preventDefault();
//         if (!username || !email || !password) {
//             setMessage("All fields are required for registration.");
//             return;
//         }

//         const users = JSON.parse(localStorage.getItem("users")) || [];
//         if (users.find(user => user.username === username)) {
//             setMessage("Username already exists.");
//             return;
//         }

//         users.push({ username, email, password });
//         localStorage.setItem("users", JSON.stringify(users));
//         setMessage("Registration successful! Please login.");
//         setUsername("");
//         setPassword("");
//         setEmail("");
//     };

//     return (
//         <>
//             <div className="login-page">
//                 <div className="lcontainer">
//                     <div className="lrow">
//                         <img src="./images/loginimg.png" alt='' />
//                         <div className="login-container">
//                         <h2>Sign Up</h2>
//                         {message && <p>{message}</p>}
//                         <form onSubmit={handleRegister}>
//                             <input
//                                 type="text"
//                                 placeholder="Username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <button type="submit" className="loginbtn">Register</button>
//                         </form>
//                         <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }




// // function LoginPage() {
    
// // }

// export default Signup;

