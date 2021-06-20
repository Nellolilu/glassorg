import React from "react";

export default function RatingsListings(props) {
  const { company } = props;
  return (
    <div>
      {!company.ratings ? (
        <p> is loading</p>
      ) : (
        <div>
          {company.ratings.map((rating) => {
            return (
              <div key={rating._id}>
                <p> {rating.date}</p>
                <p> {rating.name}</p>
                <p> {rating.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
