import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, GraduationCap } from "lucide-react";
import "./DormCard.css";

export default function DormCard({
  id,
  name,
  description,
  rating,
  reviews,
  image,
  university,
  universityColor = "indigo", // Default to indigo
  amenityIcon,
  amenityLabel,
}) {
  const navigate = useNavigate();
  
  // All university badges use indigo color
  const iconColorClass = "icon-indigo";

  const handleCardClick = () => {
    navigate(`/dorm/${id}`);
  };

  // #region agent log
  const ratingScoreRef = useRef(null);
  const ratingBadgeRef = useRef(null);
  const cardTitleRef = useRef(null);
  const cardDescriptionRef = useRef(null);

  useEffect(() => {
    if (ratingScoreRef.current && ratingBadgeRef.current) {
      const scoreEl = ratingScoreRef.current;
      const badgeEl = ratingBadgeRef.current;
      const computed = window.getComputedStyle(scoreEl);
      const badgeComputed = window.getComputedStyle(badgeEl);
      const rect = scoreEl.getBoundingClientRect();
      const textWidth = scoreEl.scrollWidth;
      
      fetch('http://127.0.0.1:7242/ingest/39b14769-cadd-4f76-89e7-7a29d898b4aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DormCard.js:useEffect',message:'Rating score computed styles',data:{width:computed.width,minWidth:computed.minWidth,maxWidth:computed.maxWidth,display:computed.display,flexShrink:computed.flexShrink,flexGrow:computed.flexGrow,textContent:scoreEl.textContent,scrollWidth:textWidth,offsetWidth:scoreEl.offsetWidth,clientWidth:scoreEl.clientWidth,rectWidth:rect.width,parentDisplay:badgeComputed.display,parentGap:badgeComputed.gap,parentAlignItems:badgeComputed.alignItems},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      fetch('http://127.0.0.1:7242/ingest/39b14769-cadd-4f76-89e7-7a29d898b4aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DormCard.js:useEffect',message:'Rating badge parent styles',data:{display:badgeComputed.display,flexDirection:badgeComputed.flexDirection,alignItems:badgeComputed.alignItems,gap:badgeComputed.gap,width:badgeComputed.width,minWidth:badgeComputed.minWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      fetch('http://127.0.0.1:7242/ingest/39b14769-cadd-4f76-89e7-7a29d898b4aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DormCard.js:useEffect',message:'Text content analysis',data:{textContent:scoreEl.textContent,textLength:scoreEl.textContent.length,fontSize:computed.fontSize,fontFamily:computed.fontFamily,fontWeight:computed.fontWeight,letterSpacing:computed.letterSpacing},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    }
    if (cardTitleRef.current && cardDescriptionRef.current) {
      const titleEl = cardTitleRef.current;
      const descEl = cardDescriptionRef.current;
      const titleComputed = window.getComputedStyle(titleEl);
      const descComputed = window.getComputedStyle(descEl);
      const titleRect = titleEl.getBoundingClientRect();
      const descRect = descEl.getBoundingClientRect();
      const actualGap = descRect.top - titleRect.bottom;
      
      fetch('http://127.0.0.1:7242/ingest/39b14769-cadd-4f76-89e7-7a29d898b4aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DormCard.js:useEffect',message:'Card title spacing analysis',data:{marginBottom:titleComputed.marginBottom,marginTop:titleComputed.marginTop,paddingBottom:titleComputed.paddingBottom,paddingTop:titleComputed.paddingTop,lineHeight:titleComputed.lineHeight,titleBottom:titleRect.bottom,descTop:descRect.top,actualGap:actualGap},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      fetch('http://127.0.0.1:7242/ingest/39b14769-cadd-4f76-89e7-7a29d898b4aa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DormCard.js:useEffect',message:'Card description spacing analysis',data:{marginBottom:descComputed.marginBottom,marginTop:descComputed.marginTop,paddingBottom:descComputed.paddingBottom,paddingTop:descComputed.paddingTop,lineHeight:descComputed.lineHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    }
  }, [rating, name, description]);
  // #endregion

  return (
    <div className="dorm-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {/* Image Container */}
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" />

        {/* University Badge (Top Left) */}
        <div className="university-badge">
          <GraduationCap className={`uni-icon ${iconColorClass}`} size={14} />
          <span className={`uni-name ${iconColorClass}`}>{university}</span>
        </div>

        {/* Rating Badge (Bottom Right) */}
        <div className="rating-badge" ref={ratingBadgeRef}>
          <Star className="star-icon" size={14} fill="#facc15" />
          <span className="rating-score" ref={ratingScoreRef}>{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        {/* Title */}
        <h3 className="card-title" ref={cardTitleRef}>{name}</h3>

        {/* Description */}
        <p className="card-description" ref={cardDescriptionRef}>{description}</p>

        {/* Footer */}
        <div className="card-footer">
          <span className="reviews-btn">
            {reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
}