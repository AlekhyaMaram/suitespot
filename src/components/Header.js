import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Edit3, X } from "lucide-react";
import "./Header.css";
import { dorms } from "./dorms";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredDorms, setFilteredDorms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter dorms based on search input
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredDorms([]);
      setShowDropdown(false);
      return;
    }

    const filtered = dorms.filter((dorm) =>
      dorm.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDorms(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown]);

  const handleClearSearch = () => {
    setSearchValue("");
    setShowDropdown(false);
  };

  const handleDormClick = (dormId) => {
    navigate(`/dorm/${dormId}`);
    setSearchValue("");
    setShowDropdown(false);
  };

  const isReviewPage = location.pathname === "/write-review";

  return (
    <header className="header-sticky">
      <div className="header-container">
        <div className="header-row">
          
          {/* Logo Section */}
          <Link to="/" className="logo-group" style={{ textDecoration: "none" }}>
            <div className="logo-icon-box">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path
                  d="M3.26 22.75V9.14H7.15V5.25H16.87V13.03H20.76V22.75H12.98V18.86H11.04V22.75H3.26ZM5.2 20.8H7.15V18.86H5.2V20.8ZM5.2 16.92H7.15V14.97H5.2V16.92ZM5.2 13.03H7.15V11.08H5.2V13.03ZM9.09 16.92H11.04V14.97H9.09V16.92ZM9.09 13.03H11.04V11.08H9.09V13.03ZM9.09 9.14H11.04V7.19H9.09V9.14ZM12.98 16.92H14.93V14.97H12.98V16.92ZM12.98 13.03H14.93V11.08H12.98V13.03ZM12.98 9.14H14.93V7.19H12.98V9.14ZM16.87 20.8H18.82V18.86H16.87V20.8ZM16.87 16.92H18.82V14.97H16.87V16.92Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="logo-text">
              <span className="text-dark">Suite</span>
              <span className="text-primary">Spot</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          {!isReviewPage && (
            <div className="search-bar-wrapper desktop-only">
              <div className="search-input-container" ref={searchRef}>
                <div className="search-icon-left">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1389 17.5L10.0139 11.375C9.52778 11.7639 8.96875 12.0718 8.33681 12.2986C7.70486 12.5255 7.03241 12.6389 6.31944 12.6389C4.55324 12.6389 3.05845 12.0272 1.83507 10.8038C0.61169 9.58044 0 8.08565 0 6.31944C0 4.55324 0.61169 3.05845 1.83507 1.83507C3.05845 0.611689 4.55324 0 6.31944 0C8.08565 0 9.58044 0.611689 10.8038 1.83507C12.0272 3.05845 12.6389 4.55324 12.6389 6.31944C12.6389 7.03241 12.5255 7.70486 12.2986 8.33681C12.0718 8.96875 11.7639 9.52778 11.375 10.0139L17.5 16.1389L16.1389 17.5ZM6.31944 10.6944C7.53472 10.6944 8.56771 10.2691 9.4184 9.4184C10.2691 8.56771 10.6944 7.53472 10.6944 6.31944C10.6944 5.10417 10.2691 4.07118 9.4184 3.22049C8.56771 2.36979 7.53472 1.94444 6.31944 1.94444C5.10417 1.94444 4.07118 2.36979 3.22049 3.22049C2.36979 4.07118 1.94444 5.10417 1.94444 6.31944C1.94444 7.53472 2.36979 8.56771 3.22049 9.4184C4.07118 10.2691 5.10417 10.6944 6.31944 10.6944Z" fill="#94A3B8"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for a dorm..."
                  className="search-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => {
                    if (filteredDorms.length > 0) {
                      setShowDropdown(true);
                    }
                  }}
                />
                {searchValue && (
                  <div className="search-icon-right">
                    <button 
                      className="clear-btn"
                      onClick={handleClearSearch}
                      type="button"
                    >
                      <X size={16} color="#94a3b8" />
                    </button>
                  </div>
                )}
                {showDropdown && filteredDorms.length > 0 && (
                  <div className="search-dropdown" ref={dropdownRef}>
                    {filteredDorms.map((dorm) => (
                      <div
                        key={dorm.id}
                        className="search-dropdown-item"
                        onClick={() => handleDormClick(dorm.id)}
                      >
                        <span>{dorm.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search Icon - Mobile */}
          {!isReviewPage && (
            <button className="mobile-search-btn mobile-only">
              <Search size={20} color="#475569" />
            </button>
          )}

          {/* Write a Review Button */}
          <Link to="/write-review" style={{ textDecoration: "none" }}>
            <button className="review-btn">
              <Edit3 size={18} />
              <span className="btn-text-desktop">Write a Review</span>
              <span className="btn-text-mobile">Review</span>
            </button>
          </Link>

        </div>
      </div>
    </header>
  );
}