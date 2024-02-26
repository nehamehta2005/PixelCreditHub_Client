import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
//import "./ContactUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../config/api";

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const data = { ...formData };
    setSenderName(data.firstName);

    fetch(baseURL + "/submitContactForm/contactUs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        setSubmitted(true);
        // Clear form data
        setFormData({
          firstName: "",
          email: "",
          message: "",
        });
        // Display success message
        // window.alert("Your message is successfully sent to admin");
        // // Show confirmation options
        setShowConfirmation(true);
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleConfirmationYes() {
    // Hide the success message and confirmation options
    setSubmitted(false);
    setShowConfirmation(false);
  }

  function handleConfirmationNo() {
    // Redirect to the home page (you may need to adjust the path)
    window.location.href = "/";
  }

  return (
    <div className="container-sm">
      {showConfirmation && (
            <div className="confirmation-options">
              <p>Do you have a new message?</p>
              <button
                onClick={handleConfirmationYes}
                className="btn btn-primary m-3"
                style={{ width: "100px" }} 
              >
                Yes
              </button>
              <button
                onClick={handleConfirmationNo}
                className="btn btn-secondary m-3"
                style={{ width: "100px" }} 
              >
                No
              </button>
            </div>
          )}
      <div className="col">
        <h2 className="mb-5">Reach Out and Connect</h2>
      </div>
      <div className="row p-5">
        <div className="col-md-8 p-3" >
          <form onSubmit={handleSubmit} className="container-sm ">
            <div className="form-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-4">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-4 d-none d-md-flex justify-content-end">
          <img
            src="https://www.svgrepo.com/download/39559/message.svg"
            alt="no picture"
            className="img-fluid"
            style={{ width: "50%" }}
          />
        </div>
      </div>

      <p className="sticker mt-4">
        <FontAwesomeIcon icon={faPhone} /> +1-2345-6789
      </p>
      <p className="sticker">
        <FontAwesomeIcon icon={faEnvelope} /> pixelcredithub@gmail.com
      </p>
      <p className="sticker">
        <FontAwesomeIcon icon={faMapMarker} /> 123 Ave, Germany, Berlin
      </p>

      {submitted && (
        <div>
          <p className="success-message">
            Thanks for your message, {senderName}! It is always nice to hear
            from you. We will get back to you.
          </p>
          {/* {showConfirmation && (
            <div className="confirmation-options">
              <p>Do you have a new message?</p>
              <button
                onClick={handleConfirmationYes}
                className="btn btn-primary mt-3"
              >
                Yes
              </button>
              <button
                onClick={handleConfirmationNo}
                className="btn btn-secondary mt-3"
              >
                No
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default ContactUs;
