import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import baseURL from "../config/api";
import loginAvatar from "../assets/images/loginavatar.png"

function Register() {
  const navigate = useNavigate();
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(
      e.target.value === document.getElementById("password").value
    );
  };

  const registerUser = (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (!passwordsMatch) {
      console.log("Passwords do not match");
      return;
    }

    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      securityQuestion,
      securityAnswer,
    };

    console.log(user);

    // Making POST request
    fetch(baseURL + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
        } else {
          e.target.reset();
          console.log("hi");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const TogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const ToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div>
      <div className="container">
        <div className="left-side">
          <h1>Unlock special features with a free account</h1>
          <br />
          <br />
          <img
            src={loginAvatar}
            alt="loginAvatar"
          />
        </div>

        <div className="right-side">
        <h1>Create your account</h1>
          <form onSubmit={registerUser}>
           
            <p>It's free and easy</p>
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name*"
              required
              autoComplete="username"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email*"
              required
              autoComplete="username"
            />
          
              <label htmlFor="password">Password:</label>
              <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Type your Password*"
                required
                autoComplete="new-password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "40%",
                  transform: "translateY(-60%)",
                  cursor: "pointer",
                }}
                onClick={TogglePassword}
              />
            </div>
            <p className="additional-options">Must be 8 characters at least</p>

             <div style={{ position: "relative", display: "inline-block" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your Password*"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                autoComplete="new-password"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "40%",
                  transform: "translateY(-60%)",
                  cursor: "pointer",
                }}
                onClick={ToggleConfirmPassword}
              />
            </div>
            {!passwordsMatch && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}

            <label className="quesLabel" htmlFor="securityQuestion">Security Question:</label>
            <select className="selectQues"
              name="securityQuestion"
              onChange={handleSecurityQuestionChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a security question
              </option>
              <option value="What was the name of your first teacher at school?">
                What was the name of your first teacher at school?
              </option>
              <option value="What is your best friend's name?">
                What is your best friend's name?
              </option>
              <option value="What is your favourite food?">
                What is your favourite food?
              </option>
              <option value="What was your first toy?">
                What was your first toy?
              </option>
            </select>

            <label htmlFor="securityAnswer">Security Answer:</label>
            <input
              type="text"
              id="securityAnswer"
              name="securityAnswer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </form>
          <div className="additional-options">
            <p>
              By creating an account means you agree to the
              <Link to="#">Terms and Conditions</Link> , and our{" "}
              <Link to="#">Privacy Policy</Link>
            </p>
            <br />
          </div>
          <p className="paragraph">or do it via other accounts</p>
          <div className="social-icons">
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
              alt="Google Icon"
              className="rounded-icon"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
              alt="Facebook Icon"
              className="rounded-icon"
            />
            <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: "2.5em" }} />
          </div>

          <div className="additional-options">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
