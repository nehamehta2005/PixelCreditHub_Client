import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LogIn() {
  const { state, dispatch } = useContext(MyContext);
  const [resetPassword, setResetPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/users/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const token = response.headers.get("token");
      if (token) {
        localStorage.setItem("token", token);
      }

      const result = await response.json();
      if (result.success) {
        dispatch({ type: "SET_USER", payload: result.data });
        navigate("/");
      } else {
        setErrorMessage(result.message || "Incorrect email or password");
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = () => {
    setResetPassword(true);
  };

  const handleSecurityQuestionSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SetForgotEmail",
      payload: { forgotEmail: e.target.email.value },
    });
    try {
      const response = await fetch(
        "http://localhost:5500/forgotPassword/compareSecurityAnswer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: e.target.email.value,
            securityQuestion: e.target.securityQuestion.value,
            securityAnswer: e.target.securityAnswer.value,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log(
          "Security answer matched! Redirecting to reset password page."
        );
        console.log(result.userId);
        const userId = result.userId;
        navigate(`/forgotPassword/resetPassword/${userId}`);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const TogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="container">
        <div className="left-side">
          <h1>Welcome to PixelCredit Hub</h1>
          <img
            src="http://www.prothetik.med.uni-goettingen.de/wp-content/uploads/sites/2/2020/11/blank-profile-picture-973460_640-1-300x300.png"
            alt="PixelCredit Hub"
          />
        </div>

        <div className="right-side">
          <p>{resetPassword ? "Security Question" : "Log In"}</p>
          <form
            onSubmit={resetPassword ? handleSecurityQuestionSubmit : loginUser}
            action="login-action"
            method="POST"
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email*"
              required
            />
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {!resetPassword && (
              <>
                  <div className="password-input-container">
                <label htmlFor="password">Password:</label>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Your Password*"
                      required
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
                 {/*  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Your Password*"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="password-toggle-icon"
                    />
                  </button> */}
                </div>
                <button type="submit">Log In</button>
              </>
            )}

            {resetPassword && (
              <>
                <label htmlFor="securityQuestion">
                  Select Security Question:
                </label>
                <select
                  id="securityQuestion"
                  name="securityQuestion"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  required
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
                  placeholder="Your Answer*"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  required
                />
                <button type="submit">Submit Answer</button>
              </>
            )}
          </form>

          <div className="additional-options">
            <p>
              {resetPassword ? (
                <Link to="/login">Back to Log In</Link>
              ) : (
                <button className="forgotPassBtn" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              )}
            </p>

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
              Already have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
