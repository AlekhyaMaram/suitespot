import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Edit3,
  Shirt, Image as ImageIcon, BookOpen, ArrowUpDown, 
  Utensils, Wifi, ChevronLeft, ChevronRight,
  Wind, Users, Sparkles
} from "lucide-react";
import "./DormDetails.css";
import { dorms } from "./dorms";

// Import info card icons
import roomTypeIcon from "./room-type-icon.png";
import capacityIcon from "./capacity-icon.png";
import sizeIcon from "./size-icon.png";
import styleIcon from "./style-icon.png";

export default function DormDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dorm = dorms.find(d => d.id === parseInt(id));

  if (!dorm) {
    return (
      <div className="dorm-details-wrapper">
        <p>Dorm not found</p>
      </div>
    );
  }

  // Get amenity icon mapping
  const amenityIcons = {
    "Laundry": <Shirt size={20} />,
    "Campus View": <ImageIcon size={20} />,
    "Study Lounge": <BookOpen size={20} />,
    "Elevator": <ArrowUpDown size={20} />,
    "Floor Kitchen": <Utensils size={20} />,
    "High-speed Wifi": <Wifi size={20} />,
    "Kitchen": <Utensils size={20} />,
    "AC": <Wind size={20} />,
    "Common space": <Users size={20} />,
    "Cleaning service": <Sparkles size={20} />,
  };

  // Sample review data
  const reviews = [
    {
      id: 1,
      username: "Lauren12",
      rating: 4,
      year: "2021",
      roomType: "Single Room",
      text: "I expected John Jay to be noisy because it's all first-years, but it was actually fine most nights. Bathrooms were cleaned daily and always stocked, but the laundry room was tiny and crowded. No kitchens, which was rough, but the location's unbeatable - right above JJ's dining hall.",
      avatar: "L"
    },
    {
      id: 2,
      username: "Jane834",
      rating: 4,
      year: "2022",
      roomType: "Single Room",
      text: "I thought it'd be super social (and chaotic), and yeah, that part was true. Bathrooms were surprisingly clean though - staff cleaned them every morning. No kitchen, so I lived off JJ's and Ferris. Laundry was okay if you timed it right. It's the best location for class and dining.",
      avatar: "J",
      avatarColor: "pink"
    }
  ];

  // Rating breakdown data
  const ratingBreakdown = {
    cleanliness: 4.7,
    noiseLevel: 4.2,
    socialLife: 4.4,
    facilities: 4.5,
    location: 4.7,
    naturalLight: 4.7,
  };

  // Star distribution
  const starDistribution = {
    5: 60,
    4: 25,
    3: 10,
    2: 3,
    1: 2,
  };

  return (
    <div className="dorm-details-wrapper">
      {/* Hero Section */}
      <div className="hero-card">
        <div className="hero-image-wrapper">
          <img src={dorm.image} alt={dorm.name} className="hero-image" />
          
          {/* Carousel Navigation Buttons */}
          <button className="hero-carousel-btn hero-carousel-btn-left">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-carousel-btn hero-carousel-btn-right">
            <ChevronRight size={24} />
          </button>
          
          {/* Overlay Content */}
          <div className="hero-overlay">
            <div className="hero-tags">
              <span className="tag available">AVAILABLE FALL 2025</span>
              <span className="tag location">
                <MapPin size={14} />
                {dorm.proximity}
              </span>
            </div>
            
            <div className="hero-info-left">
              <h1 className="hero-title">{dorm.name}</h1>
              <div className="hero-meta">
                <div className="hero-rating">
                  <Star size={20} fill="#facc15" stroke="#facc15" />
                  <span className="rating-number">{dorm.rating}</span>
                  <span className="rating-count">({dorm.reviews} ratings)</span>
                </div>
                <span className="meta-separator">•</span>
                <div className="hero-description">
                  Quiet, sunny rooms
                </div>
              </div>
            </div>
            
            <div className="hero-info-right">
              <button 
                className="review-dorm-btn"
                onClick={() => navigate("/write-review")}
              >
                <Edit3 size={18} />
                Review {dorm.name}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="info-bar">
        <div className="info-card">
          <img src={roomTypeIcon} alt="Room Type" className="info-icon-img info-icon-wide" />
          <div className="info-content">
            <div className="info-label">ROOM TYPE</div>
            <div className="info-value">{dorm.roomType || "Singles, Doubles"}</div>
          </div>
        </div>
        
        <div className="info-card">
          <img src={capacityIcon} alt="Capacity" className="info-icon-img info-icon-wide" />
          <div className="info-content">
            <div className="info-label">CAPACITY</div>
            <div className="info-value">{dorm.capacity || "1-2 People"}</div>
          </div>
        </div>
        
        <div className="info-card">
          <img src={sizeIcon} alt="Average Size" className="info-icon-img" />
          <div className="info-content">
            <div className="info-label">AVG SIZE</div>
            <div className="info-value">{dorm.avgSize || "140-240 sq ft"}</div>
          </div>
        </div>
        
        <div className="info-card">
          <img src={styleIcon} alt="Style" className="info-icon-img" />
          <div className="info-content">
            <div className="info-label">STYLE</div>
            <div className="info-value">{dorm.housing}</div>
          </div>
        </div>
      </div>

      <div className="details-content-wrapper">
        {/* Left Column */}
        <div className="details-main">
          <div className="details-sections-wrapper">
            {/* About Section */}
            <div className="details-section">
              <h2 className="section-heading">About {dorm.name}</h2>
              <p className="about-text">
                {dorm.about ? (
                  <>
                    {dorm.about.split("community vibe").map((part, index, array) => 
                      index === array.length - 1 ? (
                        part
                      ) : (
                        <React.Fragment key={index}>
                          {part}
                          <span className="highlight-text">community vibe</span>
                        </React.Fragment>
                      )
                    )}
                  </>
                ) : (
                  <>
                    A cozy dorm in the heart of campus, {dorm.name} Hall is known for its <span className="highlight-text">community vibe</span> and friendly atmosphere. Rooms have plenty of natural light and come with standard furnishing. Enjoy spacious floor lounges and close proximity to {dorm.name} dining hall!
                  </>
                )}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="details-section">
              <h2 className="section-heading">Amenities</h2>
              <div className="amenities-grid">
                {dorm.detailAmenities && dorm.detailAmenities.map((amenity, index) => (
                  <div key={index} className="amenity-card">
                    {amenityIcons[amenity] || <Star size={20} />}
                    <span>{amenity}</span>
                  </div>
                ))}
                {(!dorm.detailAmenities || dorm.detailAmenities.length === 0) && dorm.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-card">
                    {amenityIcons[amenity] || <Star size={20} />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Ratings Overview */}
        <div className="details-sidebar">
          <div className="ratings-overview-card">
            <h2 className="section-heading">Ratings Overview</h2>
            <div className="ratings-list">
              {Object.entries(ratingBreakdown).map(([category, rating]) => (
                <div key={category} className="rating-row">
                  <div className="rating-category">
                    {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="rating-display">
                    <div className="rating-bar-container">
                      <div 
                        className="rating-bar" 
                        style={{ width: `${(rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="rating-score">{rating}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="see-all-reviews-btn">See all reviews</button>
          </div>
        </div>
      </div>

      {/* Resident Reviews Section - Separate Full Width Section */}
      <div className="details-section reviews-section">
        <h2 className="section-heading">Rating & Reviews</h2>
        <p className="reviews-subtitle">Hear directly from {dorm.name} residents</p>
        
        <div className="reviews-layout">
          {/* Overall Rating Card */}
          <div className="overall-rating-card">
            <div className="rating-circle">
              <span className="rating-number">{dorm.rating}</span>
            </div>
            <div className="rating-label-text">Overall Rating</div>
            <div className="rating-count-text">Based on {dorm.reviews} reviews</div>
            
            <div className="star-distribution">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="distribution-row">
                  <span className="star-count">{stars}</span>
                  <div className="distribution-bar-container">
                    <div 
                      className={`distribution-bar ${stars <= 2 ? 'low-rating' : ''}`}
                      style={{ width: `${starDistribution[stars]}%` }}
                    ></div>
                  </div>
                  <span className="distribution-percent">{starDistribution[stars]}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list">
            {/* Individual Reviews */}
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className={`review-avatar ${review.avatarColor === "pink" ? "pink" : ""}`}>{review.avatar}</div>
                  <div className="review-meta">
                    <div className="review-username">{review.username}</div>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          fill={star <= review.rating ? "#facc15" : "none"}
                          stroke={star <= review.rating ? "#facc15" : "#cbd5e1"}
                        />
                      ))}
                    </div>
                    <div className="review-details">Year {review.year} • {review.roomType}</div>
                  </div>
                </div>
                <div className="review-content">
                  <p>{review.text}</p>
                </div>
              </div>
            ))}

            <button className="see-all-reviews-btn">See all reviews</button>
          </div>
        </div>
      </div>
    </div>
  );
}
