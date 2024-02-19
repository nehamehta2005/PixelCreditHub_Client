import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="three-sections">
        <div className="footHead">
          <h2>PixelCredit Hub</h2>
        </div>
        <div className="footBody">
          <div className="col1">
            <h5 className="heading">Our Company</h5>
            <p>Sell your content</p>
            <p>About us</p>
            <p>Careers</p>
            <p>Popular searches</p>
            <p>Coupons</p>
          </div>
          <div className="col2">
            <h5 className="heading">Contact us</h5>
            <p>+1-2345-6789</p>
            <p>123 Ave, New York, USA</p>
            <div className="socials">
            {/* <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faSquareXTwitter} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faSquareInstagram} /> hi these don't work for some reason*/}
            </div>
          </div>
          <div className="col3">
            <h5 className="heading">Legal</h5>
            <p>Website Terms of Use</p>
            <p>Terms of Service</p>
            <p>Privacy policy</p>
            <p>Cookie preferences</p>
            <p>Coupons</p>
          </div>
          <div className="col4">
            <h5 className="heading">Get the app</h5>
            <p>android button</p>
            <p>apple button</p>
          </div>
        </div>
        <div className="footFoot">
          <div className="lang">
            <FontAwesomeIcon icon={faGlobe} /> english
          </div>
          <div className="copyright">
            Copyright &#169; 2024. All rights reserved.
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer