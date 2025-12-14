import React, { useState } from "react";
import FilterBar from "./FilterBar";
import DormCard from "./DormCard";
import "./HomePage.css";

import { dorms } from "./dorms";

export default function HomePage() {
  // Filter state
  const [filters, setFilters] = useState({
    school: "",
    housing: "",
    year: "",
    roomOccupancy: [],
    rating: "",
    amenities: [],
    proximity: [],
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "amenities" || filterType === "proximity" || filterType === "roomOccupancy") {
        // For arrays (checkboxes), toggle the value
        const currentArray = prevFilters[filterType] || [];
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];
        return {
          ...prevFilters,
          [filterType]: newArray,
        };
      } else {
        // For strings (radio buttons), toggle: if already selected, deselect; otherwise set
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType] === value ? "" : value,
        };
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      school: "",
      housing: "",
      year: "",
      roomOccupancy: [],
      rating: "",
      amenities: [],
      proximity: [],
    });
  };

  // Filter dorms based on selected filters
  const filteredDorms = dorms.filter((dorm) => {
    // Filter by school
    if (filters.school && dorm.university !== filters.school) {
      return false;
    }

    // Filter by housing type
    if (filters.housing && dorm.housing !== filters.housing) {
      return false;
    }

    // Filter by class year
    if (filters.year && dorm.year !== filters.year) {
      return false;
    }

    // Filter by room occupancy (dorm's roomType must include any selected occupancy)
    if (filters.roomOccupancy.length > 0 && dorm.roomType) {
      const hasMatchingOccupancy = filters.roomOccupancy.some((occupancy) => {
        // Check if roomType string contains the occupancy type (e.g., "Singles" in "Singles, Doubles")
        const occupancyMap = {
          "Single": "Singles",
          "Double": "Doubles", 
          "Triple": "Triples"
        };
        const searchTerm = occupancyMap[occupancy] || occupancy;
        return dorm.roomType.includes(searchTerm);
      });
      if (!hasMatchingOccupancy) {
        return false;
      }
    }

    // Filter by rating (dorm's rating must be >= selected rating threshold)
    if (filters.rating) {
      const ratingThreshold = parseFloat(filters.rating.replace('+', ''));
      if (dorm.rating < ratingThreshold) {
        return false;
      }
    }

    // Filter by amenities (dorm must have ALL selected amenities)
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        dorm.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    // Filter by proximity (dorm's proximity must be in selected proximities)
    if (filters.proximity.length > 0) {
      if (!filters.proximity.includes(dorm.proximity)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={clearAllFilters}
      />
      
      <div className="content-wrapper">
        <div className="headline-section">
          <h1 className="page-title">Top Rated Dorms</h1>
          <p className="page-subtitle">
            {filteredDorms.length === dorms.length
              ? "Discover the best student housing based on 1,240+ student reviews."
              : `Showing ${filteredDorms.length} ${filteredDorms.length === 1 ? "dorm" : "dorms"} matching your filters.`}
          </p>
        </div>

        <div className="dorm-grid">
          {filteredDorms.length > 0 ? (
            filteredDorms.map((dorm) => (
              <DormCard
                key={dorm.id}
                id={dorm.id}
                name={dorm.name}
                description={dorm.description}
                rating={dorm.rating}
                reviews={dorm.reviews}
                image={dorm.image}
                university={dorm.university}
                universityColor={dorm.universityColor}
                amenityIcon={dorm.amenityIcon}
                amenityLabel={dorm.amenityLabel}
              />
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>
                No dorms match your filter criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
