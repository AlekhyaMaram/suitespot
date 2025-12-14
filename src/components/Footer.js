import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo */}
        <div className="footer-logo-group">
          <div className="footer-logo-icon-box">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path
                d="M3.26 22.75V9.14H7.15V5.25H16.87V13.03H20.76V22.75H12.98V18.86H11.04V22.75H3.26ZM5.2 20.8H7.15V18.86H5.2V20.8ZM5.2 16.92H7.15V14.97H5.2V16.92ZM5.2 13.03H7.15V11.08H5.2V13.03ZM9.09 16.92H11.04V14.97H9.09V16.92ZM9.09 13.03H11.04V11.08H9.09V13.03ZM9.09 9.14H11.04V7.19H9.09V9.14ZM12.98 16.92H14.93V14.97H12.98V16.92ZM12.98 13.03H14.93V11.08H12.98V13.03ZM12.98 9.14H14.93V7.19H12.98V9.14ZM16.87 20.8H18.82V18.86H16.87V20.8ZM16.87 16.92H18.82V14.97H16.87V16.92Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="footer-logo-text">
            <span className="footer-text-dark">Suite</span>
            <span className="footer-text-primary">Spot</span>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="footer-nav-links">
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Guidelines</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>

        {/* Right Section - Copyright */}
        <div className="footer-copyright">
          © 2025 Suite Spot
        </div>
      </div>
    </footer>
  );
}
