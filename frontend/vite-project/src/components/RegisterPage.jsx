import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
// import { Eye, EyeOff } from "lucide-react";
import astronaut from "../assets/Group.png";
import Back from "../assets/Back.png";
import icon from "../assets/icon.png";
import Lock from "../assets/Lock.png";
import Profile from "../assets/Profile.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://task-manager-0yqb.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful, redirect to login
        navigate("/");
      } else {
        // Handle registration errors
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img src={Back} alt="back" className={styles.backimg} />
        <img
          src={astronaut}
          alt="Astronaut"
          className={styles.astronautImage}
        />
        <h1 className={styles.welcomeText}>Welcome aboard my friend</h1>
        <p className={styles.subText}>Just a couple of clicks and we start</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.loginContainer}>
          <h2 className={styles.loginTitle}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <div className={styles.formInput}>
                  <img src={Profile} alt="" className={styles.inputimg1} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <div className={styles.formInput}>
                  <img src={icon} alt="" className={styles.inputimg} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <div className={styles.formInput}>
                  <img src={Lock} alt="" className={styles.inputimg} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <div className={styles.formInput}>
                  <img src={Lock} alt="" className={styles.inputimg} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePassword}
                >
                  {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
                </button>
              </div>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            <button type="submit" className={styles.loginButton}>
              Sign Up
            </button>

            <div className={styles.registerContainer}>
              <p className={styles.registerText}>Already have an account?</p>
              <button
                type="button"
                className={styles.registerLink}
                onClick={handleLoginRedirect}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
