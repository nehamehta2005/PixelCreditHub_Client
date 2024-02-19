import React, { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import SlidingPane from "react-sliding-pane";
import defaultAvatar from "../assets/images/defaultAvatar.png";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/Logo.png";
import buyCredit from "../assets/images/buy-credits.jpg";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUser,
  faCloudArrowUp,
  faBookmark,
  faCaretUp,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
//import UserProfile from "../pages/UserProfile";
import "./Navbar.css";

function Navbar() {
  const { state, dispatch } = useContext(MyContext);
  const { user, slideMenuOpen } = state;
  const navigate = useNavigate();

  const profileImage = user ? user.profileImageUrl : null;
  const isAdmin = user && user.role === "admin";

  // Handle the removal of the token on logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    dispatch({
      type: "setSlideMenuOpen",
      payload: { isPaneOpen: !slideMenuOpen.isPaneOpen },
    });

    //console.log("User:", user); // Log user after dispatching the action
  };

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch({
      type: "SetSelectedFile",
      payload: file,
    });
    // Do something with the file, like uploading or processing
  };
  const adminWarning = () => {
    alert("CAUTION\nYou can change the DB irreversibly");
  }  
  return (
    <div className="nav-bar">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logo" />
          </Link>
        </li>

        <li>
          <Link className="nav-hover category" to="/categories">
            CATEGORIES
          </Link>
        </li>
        <li>
          <Link className="nav-hover about" to="/aboutus">
            ABOUT US
          </Link>
        </li>
        <li>
          <Link className="nav-hover contact" to="/contactus">
            CONTACT US
          </Link>
        </li>
      </ul>

      <ul className="user-actions">
        <li>
          {user ? (
            <div className="loggedIn">
              <Link className="nav-hover upload" to="/images/upload">
                <FontAwesomeIcon
                  className="slideIcon"
                  icon={faCloudArrowUp}
                  style={{ color: "#000000" }}
                />
                <p>UPLOAD</p>
              </Link>
              <Link to="/shoppingcart" className="nav-hover buyCreditLink">
              <FontAwesomeIcon
                          className="slideIcon"
                          icon={faCaretUp}
                          style={{ color: "#000000" }}
                        />
                    <p>BUY CREDITS</p>
                  
              </Link>
              {isAdmin && (
                <Link to="/adminpanel" className="admin-panel-button">
                  <button className="adminBtn" onClick={adminWarning}>Admin Panel</button>
                </Link>
              )}
              <div className="Avatar" onClick={toggleMenu}>
                <img
                 src={profileImage ? profileImage : defaultAvatar}
                  alt="Profile"
                  className="profile-avatar"
                />
              </div>
              {user && (
                <SlidingPane
                  className="menuClass"
                  overlayClassName="menuOverlay"
                  isOpen={slideMenuOpen.isPaneOpen}
                  width="300px"
                  title={`Welcome, ${user.name}`}
                  onRequestClose={() =>
                    dispatch({
                      type: "setSlideMenuOpen",
                      payload: { isPaneOpen: false },
                    })
                  }
                >
                  {/* Options in the sliding pane */}
                  <ul>
                    <li>
                      <Link to={`/users/${user._id}`}>
                        <FontAwesomeIcon
                          className="slideIcon"
                          icon={faUser}
                          style={{ color: "#000000" }}
                        />
                        <p>PROFILE</p>
                      </Link>
                    </li>

                    <li>
                      <Link to="/images/upload">
                        <FontAwesomeIcon
                          className="slideIcon"
                          icon={faCloudArrowUp}
                          style={{ color: "#000000" }}
                        />
                        <p>UPLOAD IMAGES</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/userprofile">
                        <FontAwesomeIcon
                          className="slideIcon"
                          icon={faBookmark}
                          style={{ color: "#000000" }}
                        />
                        <p>LIBRARY</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/payment/:price">
                        <FontAwesomeIcon
                          className="slideIcon"
                          icon={faCaretUp}
                          style={{ color: "#000000" }}
                        />
                        <p>TOP-UP CREDITS</p>
                      </Link>
                    </li>
                  </ul>
                  <div className="centerLogout">
                    <button id="logout" onClick={handleLogout}>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        style={{ color: "#000000" }}
                      />
                      LOGOUT
                    </button>
                  </div>
                  <div className="slideFooter">
                    <div className="redirects">
                      <Link to="/">
                        <p>HOME</p>
                      </Link>
                      <Link to="/categories">
                        <p>CATEGORIES</p>
                      </Link>
                      <Link to="/aboutus">
                        <p>ABOUT</p>
                      </Link>
                      <Link to="/contactus">
                        <p>CONTACT</p>
                      </Link>
                    </div>
                    <div className="us4">
                      <p>@2024</p>
                      <p>
                        <a
                          href="https://github.com/Masouma-Rasouli"
                          target="_blank"
                        >
                          M
                        </a>
                        <a href="https://github.com/SureLife" target="_blank">
                          D
                        </a>
                        <a
                          href="https://github.com/NehaMehta2005"
                          target="_blank"
                        >
                          N (
                        </a>
                        Masouma, Daniel, Neha)
                      </p>
                    </div>
                  </div>
                </SlidingPane>
              )}
             {/*  {isAdmin && (
                <Link to="/adminpanel" className="admin-panel-button">
                  <button onClick={adminWarning}>Admin Panel</button>
                </Link>
              )} */}
              
            </div>
          ) : (
            <div className="login-links">
              <Link className="nav-hover"to="/login">LOGIN</Link>
              <Link className="nav-hover" to="/register">REGISTER</Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
