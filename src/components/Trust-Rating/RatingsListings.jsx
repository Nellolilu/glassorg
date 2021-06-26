import React from "react";

export default function RatingsListings(props) {
  const { company } = props;
  return (
    <div>
      {!company.ratings ? (
        <p> is loading</p>
      ) : (
        <div className="rating-listings">
          <div className="dash purple"></div>
          {company.ratings.map((rating) => {
            return (
              <div key={rating._id}>
                <p className="rating-info">
                  {" "}
                  {rating.date} <span className="bold">{rating.name}</span>
                </p>
                <p className="rating-content">
                  {" "}
                  <span className="bold">trust-score: {rating.rating}</span>
                  {rating.comment && <span>"{rating.comment}"</span>}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
