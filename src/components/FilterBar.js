import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, GraduationCap, X } from "lucide-react";
import "./FilterBar.css";

export default function FilterBar({ filters, onFilterChange, onClearAll }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const filterRefs = useRef({});

  const toggleFilter = (filterName) => {
    if (activeFilter === filterName) {
      setActiveFilter(null); // close if clicking the same one
    } else {
      setActiveFilter(filterName); // open new one
    }
  };

  // Helper function to check if a filter is applied
  const isFilterApplied = (filterKey) => {
    const value = filters[filterKey];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value !== "";
  };

  // close dropdown when clicking outside (simple version: close button inside)
  const closeFilter = (e) => {
    e.stopPropagation();
    setActiveFilter(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeFilter && filterRefs.current[activeFilter]) {
        const buttonElement = filterRefs.current[activeFilter].button;
        const dropdownElement = filterRefs.current[activeFilter].dropdown;
        
        if (buttonElement && dropdownElement && 
            !buttonElement.contains(event.target) && 
            !dropdownElement.contains(event.target)) {
          setActiveFilter(null);
        }
      }
    };

    if (activeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [activeFilter]);

  // update dropdown positions when active filter changes or scrolls
  useEffect(() => {
    if (!activeFilter) return undefined;

    const updatePosition = () => {
      if (activeFilter && filterRefs.current[activeFilter]) {
        const buttonElement = filterRefs.current[activeFilter].button;
        const dropdownElement = filterRefs.current[activeFilter].dropdown;
        
        if (buttonElement && dropdownElement) {
          const rect = buttonElement.getBoundingClientRect();
          // For position: fixed, use viewport coordinates directly (no scroll offsets needed)
          dropdownElement.style.top = `${rect.bottom + 8}px`;
          dropdownElement.style.left = `${rect.left}px`;
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      updatePosition();
    });
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [activeFilter]);

  return (
    <div className="filter-bar-border">
      <div className="filter-bar-container">
        <div className="filter-scroll-area">
          
          {/* School Filter */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["School"]) filterRefs.current["School"] = {};
                filterRefs.current["School"].button = el;
              }}
              className={`filter-btn ${activeFilter === "School" || isFilterApplied("school") ? "active" : ""}`}
              onClick={() => toggleFilter("School")}
            >
              <GraduationCap size={18} />
              <span>School</span>
              <ChevronDown size={18} className={activeFilter === "School" ? "rotate-180" : ""} />
            </button>
            
            {activeFilter === "School" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["School"]) filterRefs.current["School"] = {};
                  filterRefs.current["School"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>School</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                <label className="dropdown-item">
                  <span>Barnard</span>
                  <input 
                    type="radio" 
                    name="school" 
                    checked={filters.school === "Barnard"}
                    onChange={() => onFilterChange("school", "Barnard")}
                  />
                </label>
                <label className="dropdown-item">
                  <span>Columbia</span>
                  <input 
                    type="radio" 
                    name="school" 
                    checked={filters.school === "Columbia"}
                    onChange={() => onFilterChange("school", "Columbia")}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Housing Type */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["Housing"]) filterRefs.current["Housing"] = {};
                filterRefs.current["Housing"].button = el;
              }}
              className={`filter-btn ${activeFilter === "Housing" || isFilterApplied("housing") ? "active" : ""}`}
              onClick={() => toggleFilter("Housing")}
            >
              <span>Housing Type</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "Housing" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "Housing" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["Housing"]) filterRefs.current["Housing"] = {};
                  filterRefs.current["Housing"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Housing Type</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                <label className="dropdown-item">
                  <span>Suite style</span>
                  <input 
                    type="radio" 
                    name="housing" 
                    checked={filters.housing === "Suite style"}
                    onChange={() => onFilterChange("housing", "Suite style")}
                  />
                </label>
                <label className="dropdown-item">
                  <span>Corridor style</span>
                  <input 
                    type="radio" 
                    name="housing" 
                    checked={filters.housing === "Corridor style"}
                    onChange={() => onFilterChange("housing", "Corridor style")}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Class Year */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["ClassYear"]) filterRefs.current["ClassYear"] = {};
                filterRefs.current["ClassYear"].button = el;
              }}
              className={`filter-btn ${activeFilter === "ClassYear" || isFilterApplied("year") ? "active" : ""}`}
              onClick={() => toggleFilter("ClassYear")}
            >
              <span>Class Year</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "ClassYear" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "ClassYear" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["ClassYear"]) filterRefs.current["ClassYear"] = {};
                  filterRefs.current["ClassYear"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Class Year Eligibility</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                <label className="dropdown-item">
                  <span>First year housing</span>
                  <input 
                    type="radio" 
                    name="year" 
                    checked={filters.year === "First year housing"}
                    onChange={() => onFilterChange("year", "First year housing")}
                  />
                </label>
                <label className="dropdown-item">
                  <span>Upperclassman housing</span>
                  <input 
                    type="radio" 
                    name="year" 
                    checked={filters.year === "Upperclassman housing"}
                    onChange={() => onFilterChange("year", "Upperclassman housing")}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Room Occupancy */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["RoomOccupancy"]) filterRefs.current["RoomOccupancy"] = {};
                filterRefs.current["RoomOccupancy"].button = el;
              }}
              className={`filter-btn ${activeFilter === "RoomOccupancy" || isFilterApplied("roomOccupancy") ? "active" : ""}`}
              onClick={() => toggleFilter("RoomOccupancy")}
            >
              <span>Room Occupancy</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "RoomOccupancy" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "RoomOccupancy" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["RoomOccupancy"]) filterRefs.current["RoomOccupancy"] = {};
                  filterRefs.current["RoomOccupancy"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Room Occupancy</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                {["Single", "Double", "Triple"].map((item) => (
                  <label key={item} className="dropdown-item">
                    <span>{item}</span>
                    <input 
                      type="checkbox" 
                      checked={filters.roomOccupancy?.includes(item) || false}
                      onChange={() => onFilterChange("roomOccupancy", item)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["Rating"]) filterRefs.current["Rating"] = {};
                filterRefs.current["Rating"].button = el;
              }}
              className={`filter-btn ${activeFilter === "Rating" || isFilterApplied("rating") ? "active" : ""}`}
              onClick={() => toggleFilter("Rating")}
            >
              <span>Rating</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "Rating" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "Rating" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["Rating"]) filterRefs.current["Rating"] = {};
                  filterRefs.current["Rating"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Rating</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                {["4.5+", "4+", "3.5+", "3+", "2+"].map((item) => (
                  <label key={item} className="dropdown-item">
                    <span>{item}</span>
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={filters.rating === item}
                      onChange={() => onFilterChange("rating", item)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["Amenities"]) filterRefs.current["Amenities"] = {};
                filterRefs.current["Amenities"].button = el;
              }}
              className={`filter-btn ${activeFilter === "Amenities" || isFilterApplied("amenities") ? "active" : ""}`}
              onClick={() => toggleFilter("Amenities")}
            >
              <span>Amenities</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "Amenities" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "Amenities" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["Amenities"]) filterRefs.current["Amenities"] = {};
                  filterRefs.current["Amenities"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Amenities</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                {["Laundry", "AC", "Kitchen", "Cleaning service", "Common space"].map((item) => (
                  <label key={item} className="dropdown-item">
                    <span>{item}</span>
                    <input 
                      type="checkbox" 
                      checked={filters.amenities.includes(item)}
                      onChange={() => onFilterChange("amenities", item)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Campus Proximity */}
          <div className="filter-group">
            <button 
              ref={(el) => {
                if (!filterRefs.current["Proximity"]) filterRefs.current["Proximity"] = {};
                filterRefs.current["Proximity"].button = el;
              }}
              className={`filter-btn ${activeFilter === "Proximity" || isFilterApplied("proximity") ? "active" : ""}`}
              onClick={() => toggleFilter("Proximity")}
            >
              <span>Campus Proximity</span>
              <ChevronDown size={18} className={`icon-grey ${activeFilter === "Proximity" ? "rotate-180" : ""}`} />
            </button>

            {activeFilter === "Proximity" && (
              <div 
                ref={(el) => {
                  if (!filterRefs.current["Proximity"]) filterRefs.current["Proximity"] = {};
                  filterRefs.current["Proximity"].dropdown = el;
                }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <span>Campus Proximity</span>
                  <X size={16} className="close-icon" onClick={closeFilter} />
                </div>
                {["On campus", "2 - 5 min walk", "5 - 10 min walk", "10 - 15 min walk"].map((item) => (
                  <label key={item} className="dropdown-item">
                    <span>{item}</span>
                    <input 
                      type="checkbox" 
                      checked={filters.proximity.includes(item)}
                      onChange={() => onFilterChange("proximity", item)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Clear All */}
          <div className="clear-all-container">
            <button className="clear-all-btn" onClick={onClearAll}>
              Clear all
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
