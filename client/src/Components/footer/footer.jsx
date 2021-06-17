import React, { Component } from 'react';
import './footer.css';
import logo from '../../Utils/images/main_logo.png';

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <footer>
          <div className="footer-container-div">
            <div className="left-col">
              <img
                className="logo"
                src={logo}
                style={({ width: 40 }, { height: 40 })}
                alt="logo"
              />
              <div className="social-media">
                <a href="/">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="/">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="/">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <p className="rights-text">Copyright © NodongU 2021</p>
            </div>
            <div className="right-col">
              <h1 className="right-col-h1">Our Newsletter</h1>
              <div className="border"></div>
              <p>Enter Your Email to get our news and updates.</p>
              <form action="" className="newsletter-form">
                <input
                  type="email"
                  className="txtb"
                  placeholder="Enter Your Email :)"
                />
                <input
                  type="button"
                  className="newsletter-form-btn"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
